import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
//get sizes
export async function GET(
  request: Request,
  { params: { sizeId } }: { params: { sizeId: string } }
) {
  try {
    const size = await prismaDB.size.findUnique({
      where: { id: sizeId },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[sizeId-GET]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
//delete size api
export async function DELETE(
  request: Request,
  {
    params: { storeId, sizeId },
  }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("size Id is required", { status: 400 });
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
    const size = await prismaDB.size.deleteMany({
      where: { id: sizeId },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[sizeId-DELETE]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
//update size api
export async function PATCH(
  request: Request,
  {
    params: { storeId, sizeId },
  }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const body = await request.json();
    const { name, value } = body;

    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
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
    const sizes = await prismaDB.size.updateMany({
      where: { id: sizeId },
      data: { name, value },
    });
    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[sizeId-patch]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
