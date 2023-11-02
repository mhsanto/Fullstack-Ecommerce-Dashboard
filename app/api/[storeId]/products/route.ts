import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { CldOgImage } from "next-cloudinary";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      images,
      sizeId,
      categoryId,
      price,
      colorId,
      isArchived,
      isFeatured,
    } = body;
    if (!userId) {
      return new NextResponse("Unauthenticated ", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }
    if (!images || images.length === 0) {
      return new NextResponse("Missing images", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("Missing Size", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Missing Category", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("Missing Color", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Missing Price", { status: 400 });
    }
    if (!storeId) {
      return new NextResponse("Missing Store Id", { status: 400 });
    }
    const storeById = await prismaDB.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!storeById) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const product = await prismaDB.product.create({
      data: {
        name,
        sizeId,
        categoryId,
        price,
        colorId,
        isArchived,
        isFeatured,
        storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(`[product_POST]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
//get products

export async function GET(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const isFeatured = searchParams.get("isFeatured") || undefined;

    const products = await prismaDB.product.findMany({
      where: {
        storeId,
        categoryId,
        sizeId,
        colorId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(products)
    return NextResponse.json(products);
    
  } catch (error) {
    console.log(`[product_GET]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
