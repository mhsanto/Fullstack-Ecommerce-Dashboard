import { format } from "date-fns";
import prismaDB from "@/lib/prismaDB";
import BillboardClients from "./components/billboard-client";
import { BillboardColumns } from "./components/columns";

const Billboards = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const billboards = await prismaDB.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedBillboards: BillboardColumns[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, "MMMM dd,yyyy"),
    })
  );
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-0 md:p-7 pt-7">
        <BillboardClients data={formattedBillboards} />
      </div>
    </div>
  );
};

export default Billboards;
