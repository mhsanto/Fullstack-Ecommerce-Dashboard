import prismaDB from "@/lib/prismaDB";
import ColorsForm from "./components/color-form";

const colorPage = async ({
  params: { colorId },
}: {
  params: { colorId: string; storeId: string };
}) => {
  const color = await prismaDB.color.findUnique({
    where: {
      id: colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsForm initialData={color} />
      </div>
    </div>
  );
};

export default colorPage;
