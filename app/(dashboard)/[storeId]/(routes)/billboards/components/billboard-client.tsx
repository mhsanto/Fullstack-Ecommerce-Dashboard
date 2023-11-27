"use client";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumns, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";
type BillboardClientProps = {
  data: BillboardColumns[];
};
const BillboardClients: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between px-2">
        <Heading
          title={`Billboards (${data?.length})`}
          description="Manage your billboards"
        />
        <Button
        
          onClick={() => router.push(`/${params.storeId}/billboards/5f898a0b69ca9a0ea56d0a11`)}
        >
          <Plus className="mr-2 h-4 w-4 hidden md:block" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Separator />
      <Heading title="Api" description="Api calls for billboard" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId"/>
    </>
  );
};

export default BillboardClients;
