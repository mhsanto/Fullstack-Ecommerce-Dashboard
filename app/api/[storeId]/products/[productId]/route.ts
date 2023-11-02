import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
//get products
export async function GET(
  request: Request,
  { params: { productId } }: { params: { productId: string } }
) {
  try {
    const product = await prismaDB.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[productId-GET]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
//delete product api
export async function DELETE(
  request: Request,
  {
    params: { storeId, productId },
  }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    if (!productId) {
      return new NextResponse("product Id is required", { status: 400 });
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
    const product = await prismaDB.product.deleteMany({
      where: { id: productId },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[productId-DELETE]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
export async function PATCH(
  request: Request,
  {
    params: { storeId, productId },
  }: { params: { storeId: string; productId: string } }
) {
  try {
    const body = await request.json();
    const { userId } = auth();
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
    if (!productId) {
      return new NextResponse("Missing Product Id", { status: 400 });
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
    await prismaDB.product.update({
      where: { id: productId },
      data: {
        storeId,
        categoryId,
        sizeId,
        colorId,
        images: {
          deleteMany: {},
        },
        isArchived,
        isFeatured,
      },
    });
    const product = await prismaDB.product.update({
      where: { id: productId },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[productId-patch]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
