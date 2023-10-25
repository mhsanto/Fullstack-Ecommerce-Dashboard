import prismaDB from "@/lib/prismaDB";
import CategoriesForm from "./components/categories-form";

const CategoryPage = async ({
  params: { categoryId, storeId },
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = await prismaDB.category.findFirst({
    where: {
      name: categoryId,
    },
  });
  const billboards = await prismaDB.billboard.findMany({
    where: {
      storeId,
    },
    select: {
      id: true,
      storeId: true,
      label: true,
      imageUrl: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
