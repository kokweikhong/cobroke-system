"use client";

import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { UpdateListing } from "@/types/listing.types";
import { FC } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import PropertyAddressForm from "./PropertyAddressForm";
import { Switch } from "@/components/ui/switch";
import ClientForm from "./ClientForm";
import CommercialForm from "./CommercialForm";
import LandForm from "./LandForm";

type ListingFormProps = {
  // form: UseFormReturn<UpdateListing>;
  data?: UpdateListing;
};

const ListingForm: FC<ListingFormProps> = ({ data }) => {
  const form = useForm<UpdateListing>({
    defaultValues: data,
  });

  function onSubmit(values: UpdateListing) {
    console.log(values);
  }
  return (
    <div>
      <h1>Listing Form</h1>
      <div>
        <pre>{JSON.stringify(form.formState.errors)}</pre>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="listing.id"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing ID</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="listing.listingType"
            defaultValue="wtb"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified listing type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="wts">Want to Sell</SelectItem>
                    <SelectItem value="wtb">Want to Buy</SelectItem>
                    <SelectItem value="wtr">Want to Rent</SelectItem>
                    <SelectItem value="wtl">Want to Lease</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listing.listingCategory"
            defaultValue="public"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
            name="listing.propertyType"
            defaultValue="residential"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
            name="listing.currentRental"
            defaultValue="0"
            render={({ field }) => (
              <FormItem
                className={cn(
                  form.watch("listing.propertyType") === "residential"
                    ? "block"
                    : "hidden"
                )}
              >
                <FormLabel>Current Rental</FormLabel>
                <FormControl>
                  <Input type="number" step={0.01} {...field} required />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listing.projectName"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listing.tenure"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tenure</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified tenure" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem> */}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listing.propertyStatus"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified property status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem> */}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listing.landArea"
            defaultValue="0"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land Area</FormLabel>
                <FormControl>
                  <Input type="number" step={0.01} {...field} required />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listing.builtUpArea"
            defaultValue="0"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Built Up Area</FormLabel>
                <FormControl>
                  <Input type="number" step={0.01} {...field} required />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listing.price"
            defaultValue="0"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" step={0.01} {...field} required />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listing.description"
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

          <FormField
            control={form.control}
            name="listing.isAvailable"
            defaultValue={false}
            render={({ field }) => (
              <FormItem className="flex gap-x-4 items-center">
                <FormLabel>Is Available</FormLabel>
                <FormControl>
                  <Switch
                    className="!mt-0"
                    defaultChecked={false}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <PropertyAddressForm form={form} />
          <ClientForm form={form} />

          <CommercialForm form={form} />

          <LandForm form={form} />

          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ListingForm;
