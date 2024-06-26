import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";

type UserCardProps = {
  name: string;
  credits: number;
  id: string;
};

const UserCard: FC<UserCardProps> = ({ id, name, credits }) => {
  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col gap-y-2 items-center justify-center">
      <p className="text-sm">Welcome,</p>
      <h2 className="font-semibold">{name}</h2>
      <Link
        href={`/admin/users/edit/${id}`}
        className="border border-primary rounded-md px-2 py-1 text-sm text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
      >
        Edit Profile
      </Link>
      <div className="flex flex-col gap-y-2 items-center justify-center lg:flex-row lg:gap-x-4 lg:justify-between">
        <div className="flex flex-col gap-y-1 items-center justify-center">
          <span className="text-sm text-gray-500">User ID</span>
          <span>{id.slice(0, 8)}</span>
        </div>
        <Separator orientation="vertical" className="bg-gray-500" />
        <div className="flex flex-col gap-y-1 items-center justify-center">
          <span className="text-sm text-gray-500">Credits</span>
          <span>{credits}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
