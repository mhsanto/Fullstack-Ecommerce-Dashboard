import prismaDB from "@/lib/prismaDB";
import React from "react";

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const { storeId } = params;
  const store = await prismaDB.store.findFirst({
    where: {
      id: storeId,
    },
  });
  return <div className="space-y-4">Store Name:{store?.name}</div>;
};

export default DashboardPage;
