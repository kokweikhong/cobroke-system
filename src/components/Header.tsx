import Link from "next/link";

import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import UserMenu from "./UserMenu";
import { getAuthSession } from "@/actions/session";
import logo from "../../public/logo.svg";
import MobileMenu from "./MobileMenu";

const Header = async () => {
  const session = await getAuthSession();
  // if (!session) {
  //   return null;
  // }
  const fullName = session?.firstName + " " + session?.lastName;
  return (
    <header className="sticky top-0 z-40 lg:mx-auto lg:px-8">
      <div className="flex h-16 items-center justify-between gap-x-4 border-b border-gray-200 bg-adminBackground px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
        <div className="flex gap-x-4 items-center">
          <div className="lg:hidden">
            <MobileMenu />
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

        {session?.isLogged ? (
          <UserMenu name={fullName} />
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
export default Header;
