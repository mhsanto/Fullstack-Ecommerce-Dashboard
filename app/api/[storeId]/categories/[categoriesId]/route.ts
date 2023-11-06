import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
//get categories
export async function GET(
  request: Request,
  { params: { categoriesId } }: { params: { categoriesId: string } }
) {
  try {
    const category = await prismaDB.category.findUnique({
      where: { id: categoriesId },
      include:{
        billboard:true
      }
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[categories-GET]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
//delete category api
export async function DELETE(
  request: Request,
  {
    params: { storeId, categoriesId },
  }: { params: { storeId: string; categoriesId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    if (!categoriesId) {
      return new NextResponse("Categories Id is required", { status: 400 });
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
    const categories = await prismaDB.category.deleteMany({
      where: { id: categoriesId },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log("[categories-DELETE]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
export async function PATCH(
  request: Request,
  {
    params: { storeId, categoriesId },
  }: { params: { storeId: string; categoriesId: string } }
) {
  try {
    const body = await request.json();
    const { name, billboardId } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard is required", { status: 400 });
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
    const categories = await prismaDB.category.updateMany({
      where: { id: categoriesId },
      data: { name, billboardId },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log("[categoriesId-patch]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
