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

type SelectListing = InferSelectModel<typeof schema.listings>;

type MatchListingFormProps = {
  listing: SelectListing;
};

export type MatchListingFormValues = {
  listingType: string;
  propertyType: string;
  tenure: string;
  propertyStatus: string;
  projectName: string;
  landArea: string;
  builtUpArea: string;
  price: string;
  city: string;
  state: string;
};

const MatchListingForm: FC<MatchListingFormProps> = ({ listing }) => {
  const form = useForm<MatchListingFormValues>();

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
                listing.listingType === "wtb"
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
                    <Input disabled {...field} />
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

            <LandAreaInput form={form} value={listing.landArea || "0"} />

            <div>
              <Button type="submit">Match Listing</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MatchListingForm;
