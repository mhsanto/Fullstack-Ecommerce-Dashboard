import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;
    if (!userId) {
      return new NextResponse("Unauthenticated ", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Missing value", { status: 400 });
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
    const color = await prismaDB.color.create({
      data: {
        name,
        value,
        storeId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log(`[color_POST]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
//get colors

export async function GET(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
    const colors = await prismaDB.color.findMany({
      where: {
        storeId,
      },
    });
    return NextResponse.json(colors);
  } catch (error) {
    console.log(`[color_GET]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
