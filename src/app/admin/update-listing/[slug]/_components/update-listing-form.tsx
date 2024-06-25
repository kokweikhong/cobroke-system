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
import ResidentialForm from "./residential-form";
import CommercialForm from "./commercial-form";
import IndustrialForm from "./industrial-form";
import LandForm from "./land-form";

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
            <div className="flex items-center space-x-2">
              <Button type="submit">Update</Button>
              <Button
                type="button"
                variant={"destructive"}
                onClick={() => {
                  console.log("delete");
                }}
              >
                Delete
              </Button>
            </div>
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
              <TabsContent value="residential">
                <ResidentialForm form={form} />
              </TabsContent>
              <TabsContent value="commercial">
                <CommercialForm form={form} />
              </TabsContent>
              <TabsContent value="industrial">
                <IndustrialForm form={form} />
              </TabsContent>
              <TabsContent value="land">
                <LandForm form={form} />
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateListingForm;
