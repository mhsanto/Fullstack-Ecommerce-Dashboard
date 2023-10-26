import prismaDB from "@/lib/prismaDB";
import SizesForm from "./components/size-form";

const SizePage = async ({
  params: { sizesId, storeId },
}: {
  params: { sizesId: string; storeId: string };
}) => {
  const size = await prismaDB.size.findUnique({
    where: {
      id: sizesId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
