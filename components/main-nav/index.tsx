"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HammerIcon, Menu } from "lucide-react";
import MobileNav from "./mobile-nav";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Dashboard",
      isActive: pathName === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      isActive: pathName === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      isActive: pathName === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      isActive: pathName === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      isActive: pathName === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      isActive: pathName === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      isActive: pathName === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      isActive: pathName === `/${params.storeId}/settings`,
    },
  ];
  return (
    <>
      <div className="flex w-full justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex md:hidden">
            <Menu className="h-6 w-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Nav Menus</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {routes.map((route) => (
              <MobileNav key={route.href} route={route} />
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <nav
        className={cn(
          "flex gap-5 text-sm justify-start items-center md:-space-x-3.5  w-fit pr-4",
          className
        )}
        {...props}
      >
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className={cn(
              route.isActive
                ? "text-black dark:text-white font-medium"
                : "text-muted-foreground",
              "hidden md:flex hover:text-black"
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </>
  );
};
{
  /* <DropdownMenuItem>Profile</DropdownMenuItem> */
}
export default MainNav;
