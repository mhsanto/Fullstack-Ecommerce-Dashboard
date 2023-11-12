import prismaDB from "@/lib/prismaDB";

export async function getSellsCount(storeId: string) {
  const salesCount = await prismaDB.order.count({
    where:{
        storeId,
        isPaid:true
        
    },

  })
  return salesCount
}
