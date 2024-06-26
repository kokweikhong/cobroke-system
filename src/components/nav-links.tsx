"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboardIcon, ListIcon, UsersIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menuList = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboardIcon size={16} />,
    layout: ["all", "admin"],
  },
  {
    name: "Create Listing",
    path: "/admin/create-listing",
    icon: <ListIcon size={16} />,
    layout: ["admin"],
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <UsersIcon size={16} />,
    layout: ["admin"],
  },
];

const NavLinks = ({ layout }: { layout: "admin" | "all" }) => {
  const pathname = usePathname();
  return (
    <ul
      style={{ overflow: "visible" }}
      className={cn(
        "bg-white rounded-2xl py-4 overflow-y-auto overflow-x-hidden max-h-96",
        "space-y-1"
      )}
    >
      {menuList
        .filter((e) => e.layout.includes(layout))
        .map((menu: any, key: number) => (
          <li
            key={key}
            className={cn(
              "!bg-white group px-4 hover:px-0",
              pathname.startsWith(menu.path) && "px-0"
            )}
          >
            <Link href={menu.path} className="relative w-full">
              <span
                className={cn(
                  "hidden group-hover:block absolute top-0 left-0 w-2 h-full py-2 bg-primary rounded-r-lg",
                  pathname.startsWith(menu.path) && "block"
                )}
              ></span>
              <span
                className={cn(
                  "flex items-center gap-x-4 cursor-pointer",
                  "group-hover:ml-4 group-hover:-mr-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rounded-lg",
                  "transition-colors duration-200 px-4 py-2 rounded-lg",
                  pathname.startsWith(menu.path) &&
                    "ml-4 -mr-2 bg-primary text-primary-foreground rounded-lg"
                )}
              >
                {menu.icon}
                <span>{menu.name}</span>
              </span>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default NavLinks;
