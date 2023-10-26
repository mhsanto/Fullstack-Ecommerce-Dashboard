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

    const { name, billboardId } = body;
    if (!userId) {
      return new NextResponse("Unauthenticated ", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Missing billboardId", { status: 400 });
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
    const categories = await prismaDB.category.create({
      data: {
        name,
        billboardId,
        storeId,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log(`[Category_POST]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
//get billboards

export async function GET(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
  
    const categories = await prismaDB.category.findMany({
      where: {
        storeId,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log(`[Category_GET]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
