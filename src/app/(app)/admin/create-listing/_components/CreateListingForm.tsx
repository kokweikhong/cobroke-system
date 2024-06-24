"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { InferInsertModel } from "drizzle-orm";
import * as schema from "@/db/schema";
import { toast } from "sonner";
import { createListing } from "@/actions/listings";
import { FC } from "react";

type InsertListing = InferInsertModel<typeof schema.listings>;

type CreateListingFormProps = Readonly<{
  userId: string;
}>;

const CreateListingForm: FC<CreateListingFormProps> = ({ userId }) => {
  const form = useForm<InsertListing>();
  async function handleSubmit(data: InsertListing) {
    toast("Are you sure you want to create this listing?", {
      action: {
        label: "Yes",
        onClick: async () => {
          const formData = new FormData();
          formData.append("userId", data.userId);
          formData.append("listingType", data.listingType as string);
          formData.append("listingCategory", data.listingCategory as string);
          formData.append("propertyType", data.propertyType as string);
          formData.append("projectName", data.projectName as string);
          formData.append("tenure", data.tenure as string);
          formData.append("propertyStatus", data.propertyStatus as string);
          formData.append("description", data.description as string);
          try {
            await createListing(formData);
            toast.success("Listing created successfully");
          } catch (error) {
            toast.error("Failed to create listing");
          }
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
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="userId"
          defaultValue={userId}
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="listingType"
          defaultValue="wts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Listing Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified listing type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="wts">Want to Sell</SelectItem>
                  <SelectItem value="wtl">Want to Lease</SelectItem>
                  <SelectItem value="wtb">Want to Buy</SelectItem>
                  <SelectItem value="wtr">Want to Rent</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="listingCategory"
          defaultValue="public"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Listing Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified listing category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="propertyType"
          defaultValue="residential"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectName"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tenure"
          defaultValue="freehold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified tenure" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="freehold">Freehold</SelectItem>
                  <SelectItem value="leasehold">Leasehold</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="propertyStatus"
          defaultValue="vacant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified tenure" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="vacant">Vacant</SelectItem>
                  <SelectItem value="tenanted">Tenanted</SelectItem>
                  <SelectItem value="under construction">
                    Under Construction
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Create Listing</Button>
      </form>
    </Form>
  );
};

export default CreateListingForm;
