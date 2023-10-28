import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
//get billboards
export async function GET(
  request: Request,
  { params: { billboardId } }: { params: { billboardId: string } }
) {
  try {
    const billboard = await prismaDB.billboard.findUnique({
      where: { id: billboardId },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[billboardId-GET]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
//delete billboard api
export async function DELETE(
  request: Request,
  {
    params: { storeId, billboardId },
  }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
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
    const billboard = await prismaDB.billboard.deleteMany({
      where: { id: billboardId },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[billboardId-DELETE]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
export async function PATCH(
  request: Request,
  {
    params: { storeId, billboardId },
  }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const body = await request.json();
    const { label, imageUrl } = body;
    if (!label) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
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
    const billboard = await prismaDB.billboard.updateMany({
      where: { id: billboardId },
      data: { label, imageUrl },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[billboardId-patch]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
