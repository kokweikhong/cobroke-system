"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { ListIcon, LayoutDashboardIcon, UsersIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import { Separator } from "./ui/separator";

const menuList = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboardIcon size={16} />,
  },
  {
    name: "Create Listing",
    path: "/admin/create-listing",
    icon: <ListIcon size={16} />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <UsersIcon size={16} />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="hidden lg:fixed lg:top-16 lg:bottom-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6 py-6">
        {/* <div>
      <UserItem />
    </div> */}
        <div className="bg-white rounded-2xl p-4 flex flex-col gap-y-2 items-center justify-center">
          <p className="text-sm">Welcome,</p>
          <h2 className="font-semibold">Admin Cobroke</h2>
          <Link
            href={"/"}
            className="border border-primary rounded-md px-2 py-1 text-sm text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
          >
            Edit Profile
          </Link>
          <div className="flex flex-col gap-y-2 items-center justify-center lg:flex-row lg:gap-x-4 lg:justify-between">
            <div className="flex flex-col gap-y-1 items-center justify-center">
              <span className="text-sm text-gray-500">User ID</span>
              <span>123456</span>
            </div>
            <Separator orientation="vertical" className="bg-gray-500" />
            <div className="flex flex-col gap-y-1 items-center justify-center">
              <span className="text-sm text-gray-500">Credits</span>
              <span>1000</span>
            </div>
          </div>
        </div>
        <div className="grow bg-adminBackground">
          <Command
            style={{ overflow: "visible" }}
            className="bg-white rounded-2xl"
          >
            <CommandList
              style={{ overflow: "visible" }}
              className={cn(
                "bg-white rounded-2xl py-4 overflow-y-auto overflow-x-hidden max-h-96"
              )}
            >
              {menuList.map((menu: any, key: number) => (
                <CommandItem
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
                </CommandItem>
              ))}

              {/* {menuList.map((menu: any, key: number) => (
            <CommandGroup key={key} heading={menu.group}>
              {menu.items.map((option: any, optionKey: number) =>
                <CommandItem key={optionKey} className="flex gap-2 cursor-pointer">
                  {option.icon}
                  {option.text}
                </CommandItem>
              )}
            </CommandGroup>
          ))} */}
            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
