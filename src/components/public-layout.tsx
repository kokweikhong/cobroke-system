import { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon } from "lucide-react";
import UserMenu from "@/components/user-menu";
import { getAuthSession } from "@/actions/session";
import logo from "@/../../public/logo.svg";
import PublicMenu from "./public-menu";

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getAuthSession();

  const fullName = session?.firstName + " " + session?.lastName;
  return (
    <div className="bg-adminBackground">
      <header className="sticky top-0 z-40 lg:mx-auto lg:px-8">
        <div className="flex h-16 items-center justify-between gap-x-4 border-b border-gray-200 bg-adminBackground px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
          <div className="flex gap-x-4 items-center">
            <div>
              <PublicMenu />
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
      <main className="">
        <div className="px-8 py-6">
          <ScrollArea className="mx-auto p-4 rounded-2xl bg-white min-h-screen">
            <div className="h-ful p-4">{children}</div>
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}
