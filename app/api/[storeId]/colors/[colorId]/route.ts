import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
//get colors
export async function GET(
  request: Request,
  { params: { colorId } }: { params: { colorId: string } }
) {
  try {
    const color = await prismaDB.color.findUnique({
      where: { id: colorId },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[colorId-GET]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
//delete color api
export async function DELETE(
  request: Request,
  {
    params: { storeId, colorId },
  }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("color Id is required", { status: 400 });
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
    const color = await prismaDB.color.deleteMany({
      where: { id: colorId },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[colorId-DELETE]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
//update color api
export async function PATCH(
  request: Request,
  {
    params: { storeId, colorId },
  }: { params: { storeId: string; colorId: string } }
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
    const colors = await prismaDB.color.updateMany({
      where: { id: colorId },
      data: { name, value },
    });
    return NextResponse.json(colors);
  } catch (error) {
    console.log("[colorId-patch]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
