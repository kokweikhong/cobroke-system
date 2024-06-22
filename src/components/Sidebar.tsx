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
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="hidden lg:fixed lg:top-16 lg:bottom-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        {/* <div>
      <UserItem />
    </div> */}
        <div className="grow">
          <Command style={{ overflow: "visible" }}>
            <CommandList style={{ overflow: "visible" }}>
              <CommandItem>
                <Link href={"/admin/dashboard"}>Dashboard</Link>
              </CommandItem>
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
        <div>Settings / Notifications</div>
      </div>
    </div>
  );
};

export default Sidebar;
