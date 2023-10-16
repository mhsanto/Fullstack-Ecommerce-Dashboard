import Navbar from "@/components/Navbar";
import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function Dashboard({
  params: { storeId },
  children,
}: {
  params: { storeId: string };
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await prismaDB.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });
  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
