import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    const store = await prismaDB.store.deleteMany({
      where: { id: storeId, userId },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[store-DELETE]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
export async function PATCH(
  request: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
    const body = await request.json();
    const { name } = body;
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
    const store = await prismaDB.store.updateMany({
      where: { id: storeId, userId },
      data: { name },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[store-patch]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
