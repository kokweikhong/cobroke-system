"use client";

import { useForm } from "react-hook-form";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import * as schema from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";
import { useState } from "react";
import { createUsers } from "@/actions/users";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type User = InferInsertModel<typeof schema.users>;

type FormData = {
  file: FileList;
};

export default function Page() {
  // TODO: Implement create user
  const { register, handleSubmit } = useForm<FormData>();
  const [users, setUsers] = useState<User[]>([]);

  async function uploadUsers() {
    toast("Are you sure you want to upload these users?", {
      action: {
        label: "Yes",
        onClick: async () => {
          await createUsers(users);
          toast.success("Users uploaded successfully");
        },
      },
      cancel: {
        label: "No",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
  }

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);

    Papa.parse(data.file[0], {
      header: true,
      complete: function (results) {
        let users = results.data as User[];
        users = users.map((user) => {
          return {
            ...user,
            password: "cobroke",
            role: "user",
          };
        });

        setUsers(users);
      },
    });
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">CSV Upload</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            User CSV File
          </label>
          <Input type="file" {...register("file")} />
        </div>

        <Button type="submit">Get Users</Button>
      </form>

      <Separator className="my-4" />

      {users.length > 0 && (
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{`
              ${users.length} users found in the CSV file
            `}</h2>
          </div>
          <div>
            <Button onClick={uploadUsers}>Upload to database</Button>
          </div>
          <ul className="list-disc ml-6 my-2 text-sm">
            {users.map((user, index) => (
              <li
                key={`user-${index}`}
                className="my-1 text-gray-600 font-normal"
              >
                <span>{user.email}</span>
                <span className="mx-2">|</span>
                <span>
                  {user.firstName} {user.lastName}
                </span>
                <span className="mx-2">|</span>
                <span className="ml-2">{user.contactNumber}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}