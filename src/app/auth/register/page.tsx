"use client";

import { useForm } from "react-hook-form";
import { InferInsertModel } from "drizzle-orm";
import * as schema from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import logo from "@/../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { createUser } from "@/actions/user.actions";

type InsertUser = InferInsertModel<typeof schema.users>;

export default function Page() {
  const form = useForm<InsertUser>();
  return (
    <div className="mt-10 min-h-full flex flex-col items-center justify-center max-w-3xl mx-auto px-4">
      <Link href={"/"} className="mb-4">
        <Image
          src={logo}
          alt="Cobroke System"
          className="mx-auto h-10 w-auto"
        />
      </Link>
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Create User</h1>
      </div>
      <div className="w-full">
        <Form {...form}>
          <form action={createUser} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              defaultValue="user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <Button type="submit">Create User</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
