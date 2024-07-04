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
import { z } from "zod";

type User = InferInsertModel<typeof schema.users>;

type FormData = {
  file: FileList;
};

export default function Page() {
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

  function downloadCSVSample() {
    const sampleData = [
      ["firstName", "lastName", "email", "contactNumber"],
      ["Aaron", "Lee", "aaron.lee@gmail.com", "60123456789"],
    ];
    const csv = Papa.unparse(sampleData);
    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvURL = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", `user-upload-sample.csv`);
    tempLink.click();
  }

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    if (!data.file[0]) {
      toast.warning("Please select a file");
      return;
    }

    formData.append("file", data.file[0]);

    Papa.parse(data.file[0], {
      header: true,
      complete: function (results) {
        console.log("Finished:", results.data);
        let users = results.data as User[];
        users = users
          .filter((e) => e.email)
          .map((user) => {
            return {
              ...user,
              password: "cobroke",
              role: "user",
              isActive: true,
              isApproved: true,
              isVerified: true,
            };
          });
        console.log(users);

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

        <div className="flex gap-x-2">
          <Button type="submit">Get Users</Button>
          <Button
            type="button"
            className="bg-white text-[#808080] border border-[#808080] rounded-lg !p-[10px] hover:bg-[#808080] hover:text-white"
            onClick={downloadCSVSample}
          >
            Download CSV Sample
          </Button>
        </div>
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
