"use client";

import { useForm } from "react-hook-form";
import { SelectUser } from "@/types/user.types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { userRoles } from "@/constants/user.constants";
import { Switch } from "@/components/ui/switch";
import { updateUser } from "@/actions/users";
import { FC } from "react";

type UserFormProps = {
  data: SelectUser;
};

const UserForm: FC<UserFormProps> = ({ data }) => {
  const form = useForm<SelectUser>({
    defaultValues: data,
  });
  return (
    <div>
      <Form {...form}>
        <form action={updateUser} className="space-y-4">
          <FormField
            control={form.control}
            name="id"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
              </FormItem>
            )}
          />

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
                  <Input type="email" {...field} disabled />
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
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Select a verified role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {userRoles.map((role) => (
                      <SelectItem
                        key={role}
                        value={role}
                        className="capitalize"
                      >
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNumber"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="space-y-6 !mt-8">
            <FormField
              control={form.control}
              name="isActive"
              defaultValue={false}
              render={({ field }) => (
                <FormItem className="flex gap-x-4 items-center">
                  <FormLabel>Is Active</FormLabel>
                  <FormControl>
                    <Switch
                      className="!mt-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isVerified"
              defaultValue={false}
              render={({ field }) => (
                <FormItem className="flex gap-x-2 items-center">
                  <FormLabel>Is Verified</FormLabel>
                  <FormControl>
                    <Switch
                      className="!mt-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isApproved"
              defaultValue={false}
              render={({ field }) => (
                <FormItem className="flex gap-x-2 items-center">
                  <FormLabel>Is Approved</FormLabel>
                  <FormControl>
                    <Switch
                      className="!mt-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="py-2 px-4 bg-primary text-white rounded-md"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserForm;
