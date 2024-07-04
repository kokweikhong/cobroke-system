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
import {
  LogOutIcon,
  UserCogIcon,
  ChevronDownIcon,
  KeyIcon,
} from "lucide-react";
import Link from "next/link";

type UserMenuProps = {
  id: string;
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
      <DropdownMenuContent className="w-[170px]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={`/admin/users/edit/${props.id}`}
            className="cursor-pointer flex items-center justify-between w-full"
          >
            <span>Profile</span>
            <UserCogIcon size="16" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`/admin/users/change-password/${props.id}`}
            className="cursor-pointer flex items-center justify-between w-full"
          >
            <span>Change Password</span>
            <KeyIcon size="16" />
          </Link>
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
