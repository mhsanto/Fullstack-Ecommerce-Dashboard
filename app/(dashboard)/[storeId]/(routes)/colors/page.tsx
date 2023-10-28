import { format } from "date-fns";
import prismaDB from "@/lib/prismaDB";
import {  ColorColumns } from "./components/columns";
import ColorClients from "./components/client";

const Colors = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const colors = await prismaDB.color.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedColors: ColorColumns[] = colors.map((Color) => ({
    id: Color.id,
    name: Color.name,
    value: Color.value,
    createdAt: format(Color.createdAt, "MMMM dd,yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-7 pt-7">
        <ColorClients data={formattedColors} />
      </div>
    </div>
  );
};

export default Colors;
