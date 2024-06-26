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
import NavLinks from "./nav-links";

const PublicMenu = () => {
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
          <SheetDescription>
            Welcome to cobroke system for real estate agents
          </SheetDescription>
        </SheetHeader>
        <div className="grow bg-white h-full mt-4 rounded-xl">
          <div style={{ overflow: "visible" }} className="bg-white rounded-2xl">
            <NavLinks layout="all" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PublicMenu;
