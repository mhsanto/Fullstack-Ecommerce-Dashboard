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

    const { label, imageUrl } = body;
    if (!userId) {
      return new NextResponse("Unauthenticated ", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Missing name", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Missing Image", { status: 400 });
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
    const billboard = await prismaDB.billboard.create({
      data: {
        label,
        imageUrl,
        storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log(`[Billboard_POST]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
//get billboards

export async function GET(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
  
    const billboards = await prismaDB.billboard.findMany({
      where: {
        storeId,
      },
    });
    return NextResponse.json(billboards);
  } catch (error) {
    console.log(`[Billboard_GET]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
