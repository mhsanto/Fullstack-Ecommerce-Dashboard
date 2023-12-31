"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Hamburger from "./hamburger";
import useDeviceWidth from "@/hooks/useDeviceWidth";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const deviceWidth = useDeviceWidth();
  const isMobile = deviceWidth < 768;
  //Handles the opening and closing of our nav
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);
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
      <Hamburger handleClick={handleClick} isOpen={isOpen} />

      <nav
        className={cn(
          "flex  md:flex-row md:gap-6 md:text-xs lg:text-sm absolute md:static  top-[64px] left-0 dark:md:bg-transparent dark:bg-slate-900 bg-slate-100 md:bg-transparent  right-0  w-full md:w-auto items-center md:-space-x-3.5 md:pl-5 z-20",
          isOpen ? "flex-col" : "hidden",

          className
        )}
        {...props}
      >
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className={cn(
              "w-full md:text-sm font-medium bg-transparent transition-colors  text-lg py-3    text-center",
              isMobile
                ? "hover:bg-slate-300  dark:hover:text-black hover:text-black"
                : "hover:text-white  md:hover:text-gray-800 dark:md:hover:text-slate-300 ",

              route.isActive
                ? "text-black dark:text-white "
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default MainNav;
