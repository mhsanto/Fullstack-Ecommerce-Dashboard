import { format } from "date-fns";
import prismaDB from "@/lib/prismaDB";
import OrderClients from "./components/order-client";
import { OrderColumns } from "./components/columns";
import { formatter } from "@/lib/utils";

const Orders = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const orders = await prismaDB.order.findMany({
    where: {
      storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedOrders: OrderColumns[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    isPaid: order.isPaid,
    products: order.orderItems.map((item) => item.product.name).join(", "),
    totalPrice: formatter.format(
      order.orderItems.reduce(
        (total, item) => total + Number(item.product.price),
        0
      )
    ),
    createdAt: format(order.createdAt, "MMMM dd,yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-7 pt-7">
        <OrderClients data={formattedOrders} />
      </div>
    </div>
  );
};

export default Orders;
