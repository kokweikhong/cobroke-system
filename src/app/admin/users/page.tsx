"use client";

import Link from "next/link";
import { userOMG } from "./actions";
import { generateMockUsers } from "@/mocks/users";
import SearchUser from "./_components/search-user";
import UpdateButton from "./_components/update-button";

export default function Page() {
  const users = generateMockUsers();
  return (
    <div>
      <div className="flex justify-between p-6">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
      </div>
      <div className="flex flex-col gap-4 md:justify-between p-4">
        <div>
          <SearchUser />
        </div>
        <div className="">
          <Link
            href="/admin/users/create"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
          >
            Create User
          </Link>
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-16rem)]">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {users.map((user) => (
            <li
              key={user.id}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {`${user.firstName} ${user.lastName}`}
                    </h3>
                    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {user.role}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500">
                    {user.contactNumber}
                  </p>
                  <p className="mt-1 truncate text-sm text-gray-500">
                    {user.email}
                  </p>
                </div>
                {/* <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={person.imageUrl} alt="" /> */}
              </div>
              <div>
                <UpdateButton
                  userId={user.id}
                  isActive={user.isActive}
                  isApproved={user.isApproved}
                  isVerified={user.isVerified}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
