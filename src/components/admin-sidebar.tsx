import { FC } from "react";
import NavLinks from "./nav-links";
import UserCard from "./user-card";

type AdminSidebarProps = {
  userId: string;
  userName: string;
  userCredits: number;
};
const AdminSidebar: FC<AdminSidebarProps> = ({
  userId,
  userName,
  userCredits,
}) => {
  return (
    <div className="hidden lg:fixed lg:top-16 lg:bottom-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6 py-6">
        <UserCard id={userId} name={userName} credits={userCredits} />
        <div className="grow bg-white rounded-2xl">
          <div style={{ overflow: "visible" }}>
            <NavLinks layout="admin" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
