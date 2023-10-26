import prismaDB from "@/lib/prismaDB";
import BillboardsForm from "./components/billboard-form";

const BillboardPage = async ({
  params: { billboardId, storeId },
}: {
  params: { billboardId: string; storeId: string };
}) => {
  const billboard = await prismaDB.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
