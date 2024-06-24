"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as schema from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { MoveRightIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import LandAreaInput from "./LandAreaInput";
import BuiltUpAreaInput from "./BuiltUpAreaInput";
import PriceInput from "./PriceInput";
import { ListingWithJoins, MatchListingFormValues } from "@/types/listings";
import ResidentialForm from "./ResidentialForm";

type SelectListing = InferSelectModel<typeof schema.listings>;

type ListingFormProps = {
  data: ListingWithJoins;
};

const ListingForm: FC<ListingFormProps> = ({ data }) => {
  const listing = data.listings;
  const form = useForm<MatchListingFormValues>({
    defaultValues: {
      minLandArea: 0,
      maxLandArea: 0,
      minBuiltUpArea: 0,
      maxBuiltUpArea: 0,
      minPrice: 0,
      maxPrice: 0,
    },
  });

  function onSubmit(values: MatchListingFormValues) {
    console.log(values);
  }
  return (
    <div>
      <div className="mb-4">
        <h1>Match Listing Form</h1>
      </div>
      <div>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="listingType"
              defaultValue={
                data.listings.listingType === "wtb"
                  ? "wts"
                  : listing.listingType === "wts"
                  ? "wtb"
                  : listing.listingType === "wtl"
                  ? "wtr"
                  : listing.listingType === "wtr"
                  ? "wtl"
                  : ""
              }
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Type</FormLabel>
                  <div className="flex gap-x-4 items-center">
                    <h3 className="uppercase">{listing.listingType}</h3>
                    <MoveRightIcon />
                    <FormControl>
                      <Input className="uppercase w-auto" disabled {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="propertyType"
              defaultValue={listing.propertyType}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <FormControl>
                    <Input className="capitalize" disabled {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              <Label htmlFor="tenure">Tenure</Label>
              <div className="flex gap-x-2 items-center">
                <Switch
                  onCheckedChange={(checked) => {
                    if (checked) {
                      form.setValue("tenure", listing.tenure);
                    } else {
                      form.setValue("tenure", "");
                    }
                  }}
                />
                <Input
                  id="tenure"
                  name="tenure"
                  disabled
                  value={listing.tenure}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="propertyStatus">Property Status</Label>
              <div className="flex gap-x-2 items-center">
                <Switch
                  onCheckedChange={(checked) => {
                    if (checked) {
                      form.setValue("propertyStatus", listing.propertyStatus);
                    } else {
                      form.setValue("propertyStatus", "");
                    }
                  }}
                />
                <Input
                  id="propertyStatus"
                  name="propertyStatus"
                  disabled
                  value={listing.propertyStatus}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <div className="flex gap-x-2 items-center">
                <Switch
                  onCheckedChange={(checked) => {
                    if (checked) {
                      form.setValue("projectName", listing.projectName);
                    } else {
                      form.setValue("projectName", "");
                    }
                  }}
                />
                <Input
                  id="projectName"
                  name="projectName"
                  disabled
                  value={listing.projectName}
                />
              </div>
            </div>

            <LandAreaInput form={form} value={listing.landArea || "20"} />
            <BuiltUpAreaInput form={form} value={listing.builtUpArea || "30"} />
            <PriceInput form={form} value={listing.price || "1000"} />

            <ResidentialForm form={form} />

            <div>
              <Button type="submit">Match Listing</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ListingForm;
