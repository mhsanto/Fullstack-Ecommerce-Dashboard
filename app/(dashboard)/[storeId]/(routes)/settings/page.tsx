import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";

type SettingsPageParams = {
  params: {
    storeId: string;
  };
};
const SettingsPage = async ({ params: { storeId } }: SettingsPageParams) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const store = await prismaDB.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });
  if (!store) redirect("/");

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-7 pt-7">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
