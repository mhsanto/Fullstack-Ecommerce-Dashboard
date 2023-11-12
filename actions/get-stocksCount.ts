import prismaDB from "@/lib/prismaDB";

export async function getStocksCount(storeId: string) {
  const stocksCount = await prismaDB.product.count({
    where:{
        storeId,
        isArchived:true
        
    },

  })
  return stocksCount
}
