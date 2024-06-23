"use client";

import { signOut } from "@/actions/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, UserCogIcon, ChevronDownIcon } from "lucide-react";

type UserMenuProps = {
  name: string;
};

export default function UserMenu(props: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-x-2 cursor-pointer font-medium">
          <span>{props.name}</span>
          <ChevronDownIcon size="20" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          <button>Profile</button>
          <UserCogIcon size="16" />
        </DropdownMenuItem>
        <form action={signOut}>
          <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
            <button>Sign Out</button>
            <LogOutIcon size="16" />
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
