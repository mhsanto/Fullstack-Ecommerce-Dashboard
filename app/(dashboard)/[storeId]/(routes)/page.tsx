import { getSellsCount } from "@/actions/get-sellscount";
import { getTotalRevenue } from "@/actions/get-totalRevenue";
import { getStocksCount } from "@/actions/get-stocksCount";
import Heading from "@/components/ui/Heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prismaDB from "@/lib/prismaDB";
import { formatter } from "@/lib/utils";
import { CreditCard, Package } from "lucide-react";
import React from "react";
import OverView from "@/components/OverView";
import { getGraphRevenue } from "@/actions/get-graph-revenue";

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const { storeId } = params;
  const totalRevenue = await getTotalRevenue(storeId);
  const sellsCount = await getSellsCount(storeId);
  const stockCount = await getStocksCount(storeId);
  const getGraphData = await getGraphRevenue(storeId);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <Heading description="Overview of your store" title="Dashboard" />
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 ">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-4">
              <CardTitle className="text-sm font-medium mr-1">
                Total Revenue
              </CardTitle>
              &#2547;
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-4">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="hidden md:block dw-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{sellsCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-4">
              <CardTitle className="text-sm font-medium">
                Product In Store
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground hidden md:block" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{stockCount}</div>
            </CardContent>
          </Card>

        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>OverView</CardTitle>

          </CardHeader>
          <CardContent className="pl-2">
            <OverView data={getGraphData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
