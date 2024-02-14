import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import Link from "next/link";

const MobileNav = ({
  route,
}: {
  route: {
    href: string;
    label: string;
    isActive: boolean;
  };
}) => {
  return (
    <DropdownMenuItem
      key={route.href}
      className={cn(
        "hover:text-black hover:bg-gray-50 cursor-pointer",

        route.isActive
          ? "text-black dark:text-white font-medium underline underline-offset-2"
          : "text-slate-800"
      )}
    >
      <Link href={route.href} key={route.href}>
        {route.label}
      </Link>
    </DropdownMenuItem>
  );
};

export default MobileNav;
