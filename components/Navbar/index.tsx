import { UserButton, auth } from "@clerk/nextjs";
import MainNav from "../main-nav";
import StoreSwitcher from "../store-switcher";
import { redirect } from "next/navigation";
import prismaDB from "@/lib/prismaDB";
import { ThemeToggle } from "../theme-toggle";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const stores = await prismaDB.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b relative w-full ">
      <div className="flex h-16 px-4 items-center relative w-full ">
        <StoreSwitcher items={stores} />
        <MainNav />
        <div className="ml-auto flex  items-center space-x-4">
          <ThemeToggle />
          <div className="ml-3 pl-5"/>
          <div className="hidden md:flex">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
