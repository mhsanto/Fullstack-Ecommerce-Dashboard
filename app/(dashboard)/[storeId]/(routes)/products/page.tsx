import { format } from "date-fns";
import prismaDB from "@/lib/prismaDB";
import ProductClients from "./components/client";
import { ProductColumns } from "./components/columns";
import { formatter } from "@/lib/utils";

const Billboards = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const products = await prismaDB.product.findMany({
    where: {
      storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedProducts: ProductColumns[] = products.map(
    (product) => ({
      id: product.id,
      name: product.name,
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      price:formatter.format(product.price),
      category: product.category.name,
      size: product.size.name,
      color: product.color.value,

      createdAt: format(product.createdAt, "MMMM dd,yyyy"),
    })
  );
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-7 pt-7">
        <ProductClients data={formattedProducts} />
      </div>
    </div>
  );
};

export default Billboards;
