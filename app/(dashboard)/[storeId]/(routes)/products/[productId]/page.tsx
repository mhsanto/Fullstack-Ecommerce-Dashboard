import prismaDB from "@/lib/prismaDB";
import ProductForm from "./components/product-form";

const ProductPage = async ({
  params: { productId, storeId },
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prismaDB.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });
  const categories = await prismaDB.category.findMany({
    where: {
      storeId,
    },
  });
  const color = await prismaDB.color.findMany({
    where: {
      storeId,
    },
  });
  const sizes = await prismaDB.size.findMany({
    where: {
      storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          sizes={sizes}
          categories={categories}
          color={color}
        />
      </div>
    </div>
  );
};

export default ProductPage;
