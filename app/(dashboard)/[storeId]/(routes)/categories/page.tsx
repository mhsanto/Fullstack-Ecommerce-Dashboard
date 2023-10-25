import { format } from "date-fns";
import prismaDB from "@/lib/prismaDB";
import CategoryClient from "./components/client";
import { CategoryColumn } from "./components/columns";

const CategoriesPage = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const categories = await prismaDB.category.findMany({
    where: {
      storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,

    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "MMMM dd,yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-7 pt-7">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
