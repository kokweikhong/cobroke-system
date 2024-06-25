"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ListingWithJoins } from "@/types/listings";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

type ClientFormProps = {
  form: UseFormReturn<ListingWithJoins>;
};

const ClientForm: FC<ClientFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="clients.id"
        defaultValue={0}
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
        name="clients.name"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter client name" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="clients.email"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Email</FormLabel>
            <FormControl>
              <Input type="email" {...field} placeholder="Enter client email" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="clients.contactNumber"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Contact</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter client contact" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ClientForm;
