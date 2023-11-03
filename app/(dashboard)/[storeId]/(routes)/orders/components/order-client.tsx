"use client";

import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumns, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
type OrderClientProps = {
  data: OrderColumns[];
};
const OrderClients: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
        <Heading
          title={`Orders (${data?.length})`}
          description="Manage your orders"
        />


      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />

 
    </>
  );
};

export default OrderClients;
