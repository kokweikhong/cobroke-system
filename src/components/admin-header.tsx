import Link from "next/link";

import { ChevronDownIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import UserMenu from "./user-menu";
import logo from "../../public/logo.svg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavLinks from "./nav-links";
import UserCard from "./user-card";
import { FC } from "react";

type AdminHeaderProps = {
  userId: string;
  userName: string;
  userCredits: number;
  isAuth: boolean;
};

const AdminHeader: FC<AdminHeaderProps> = ({
  userId,
  userName,
  userCredits,
  isAuth,
}) => {
  return (
    <header className="sticky top-0 z-40 lg:mx-auto lg:px-8">
      <div className="flex h-16 items-center justify-between gap-x-4 border-b border-gray-200 bg-adminBackground px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
        <div className="flex gap-x-4 items-center">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <MenuIcon size={20} />
              </SheetTrigger>
              <SheetContent side={"left"} className="bg-adminBackground">
                <SheetHeader>
                  <SheetTitle className="mb-4">
                    <Image
                      src={logo}
                      alt="Logo"
                      width={500}
                      height={500}
                      className="w-auto h-8 object-cover mx-auto"
                    />
                  </SheetTitle>
                  <SheetDescription></SheetDescription>
                  <UserCard
                    id={userId || "123456789"}
                    name={userName || "John Doe"}
                    credits={userCredits || 1000}
                  />
                </SheetHeader>
                <div className="grow bg-white h-full mt-4 rounded-xl">
                  <div
                    style={{ overflow: "visible" }}
                    className="bg-white rounded-2xl"
                  >
                    <NavLinks layout="admin" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link href={"/"} className="lg:ml-12">
            <Image
              src={logo}
              alt="Logo"
              width={500}
              height={500}
              className="w-auto h-6 lg:h-8 object-cover"
            />
          </Link>
        </div>

        {isAuth ? (
          <UserMenu name={userName} />
        ) : (
          <Link
            href="/auth/signin"
            className="flex items-center gap-x-2 cursor-pointer font-medium"
          >
            <span>Register / Log in</span>
            <ChevronDownIcon size={24} />
          </Link>
        )}
      </div>
    </header>
  );
};
export default AdminHeader;
