import prismaDB from "@/lib/prismaDB";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type,  Authorization",
};
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
export async function POST(
  request: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  const { productIds } = await request.json();
  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }
  const products = await prismaDB.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "BDT",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
    });
  });
  const order = await prismaDB.order.create({
    data: {
      storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });
  return NextResponse.json({ url: session.url }, { headers: corsHeaders });
}
