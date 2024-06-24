import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const UserCard = () => {
  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col gap-y-2 items-center justify-center">
      <p className="text-sm">Welcome,</p>
      <h2 className="font-semibold">Admin Cobroke</h2>
      <Link
        href={"/admin/users/edit/1"}
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
  );
};

export default UserCard;
