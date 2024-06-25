"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ListingWithJoins } from "@/types/listings";
import { FC } from "react";
import { useForm } from "react-hook-form";
import ListingForm from "./listing-form";
import AddressForm from "./address-form";
import ClientForm from "./client-form";

type UpdateListingFormProps = {
  data: ListingWithJoins;
};

const UpdateListingForm: FC<UpdateListingFormProps> = ({ data }) => {
  const form = useForm<ListingWithJoins>({
    defaultValues: data,
  });

  function onSubmit(values: ListingWithJoins) {
    console.log(values);
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Update Listing</h1>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs defaultValue="listing" className="w-auto">
              <TabsList className="flex flex-wrap gap-2 py-4 h-auto">
                <TabsTrigger value="listing">Listing</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="client">Client</TabsTrigger>
                <TabsTrigger value="residential">Residential</TabsTrigger>
                <TabsTrigger value="commercial">Commercial</TabsTrigger>
                <TabsTrigger value="industrial">Industrial</TabsTrigger>
                <TabsTrigger value="land">Land</TabsTrigger>
              </TabsList>
              <TabsContent value="listing">
                <ListingForm form={form} />
              </TabsContent>
              <TabsContent value="address">
                <AddressForm form={form} />
              </TabsContent>
              <TabsContent value="client">
                <ClientForm form={form} />
              </TabsContent>
            </Tabs>

            <div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateListingForm;
