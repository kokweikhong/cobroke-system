import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import logo from "../../public/logo.svg";
import Image from "next/image";
import UserCard from "./UserCard";
import NavLinks from "./NavLinks";

const MobileMenu = () => {
  return (
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
          <UserCard />
        </SheetHeader>
        <div className="grow bg-white h-full mt-4 rounded-xl">
          <div style={{ overflow: "visible" }} className="bg-white rounded-2xl">
            <NavLinks />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
