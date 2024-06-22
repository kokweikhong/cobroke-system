import Link from "next/link";

import { MenuIcon } from "lucide-react";
import Image from "next/image";
import UserMenu from "./UserMenu";
import Menu from "./Sidebar";
import { getAuthSession } from "@/actions/session";
import logo from "../../public/logo.svg";
import DesktopMenu from "./Sidebar";
import MobileMenu from "./MobileMenu";

const Header = async () => {
  const session = await getAuthSession();
  // if (!session) {
  //   return null;
  // }
  const fullName = session?.firstName + " " + session?.lastName;
  return (
    <header className="sticky top-0 z-40 lg:mx-auto lg:px-8">
      <div className="flex h-16 items-center justify-between gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
        <div className="flex gap-x-4 items-center">
          <div className="lg:hidden">
            <MobileMenu />
          </div>
          <div>
            <Image
              src={logo}
              alt="Logo"
              width={500}
              height={500}
              className="w-auto h-6 md:h-8 object-cover"
            />
          </div>
        </div>
        {/* <div className="hidden md:block">
        <DesktopMenu />
      </div> */}

        <UserMenu name={fullName} />
        {/* <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav> */}
      </div>
    </header>
  );
};
export default Header;
