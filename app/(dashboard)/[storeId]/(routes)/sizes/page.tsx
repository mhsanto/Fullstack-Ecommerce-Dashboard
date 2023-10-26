import { format } from "date-fns";
import prismaDB from "@/lib/prismaDB";
import {  SizeColumns } from "./components/columns";
import SizeClients from "./components/client";

const Sizes = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const sizes = await prismaDB.size.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedSizes: SizeColumns[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, "MMMM dd,yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-7 pt-7">
        <SizeClients data={formattedSizes} />
      </div>
    </div>
  );
};

export default Sizes;
