"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { MoveRightIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import LandAreaInput from "./land-area-input";
import BuiltUpAreaInput from "./builtup-area-input";
import PriceInput from "./price-input";
import { ListingWithJoins, MatchListingFormValues } from "@/types/listings";
import {
  getOppositeListingType,
  getReadableListingType,
} from "@/lib/listing-type";

type ListingFormProps = {
  form: UseFormReturn<MatchListingFormValues>;
  data: ListingWithJoins;
};

const ListingForm: FC<ListingFormProps> = ({ form, data }) => {
  const listing = data.listings;

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold tracking-wide text-gray-700">
          Listing Details
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-wide text-gray-700">
            {data.listings.id}
          </h3>
        </div>
        <div className="flex gap-x-4 items-center">
          <h3 className="uppercase">
            {getReadableListingType(data.listings.listingType)}
          </h3>
          <MoveRightIcon />
          <h3 className="uppercase">
            {getReadableListingType(
              getOppositeListingType(form.watch("listingType"))
            )}
          </h3>
        </div>

        <FormField
          control={form.control}
          name="propertyType"
          defaultValue={""}
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
                  form.setValue("tenure", data.listings.tenure);
                } else {
                  form.setValue("tenure", "");
                }
              }}
            />
            <Input
              id="tenure"
              name="tenure"
              disabled
              value={data.listings.tenure}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="propertyStatus">Property Status</Label>
          <div className="flex gap-x-2 items-center">
            <Switch
              onCheckedChange={(checked) => {
                if (checked) {
                  form.setValue("propertyStatus", data.listings.propertyStatus);
                } else {
                  form.setValue("propertyStatus", "");
                }
              }}
            />
            <Input
              id="propertyStatus"
              name="propertyStatus"
              disabled
              value={data.listings.propertyStatus}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="projectName">Project Name</Label>
          <div className="flex gap-x-2 items-center">
            <Switch
              onCheckedChange={(checked) => {
                if (checked) {
                  form.setValue("projectName", data.listings.projectName);
                } else {
                  form.setValue("projectName", "");
                }
              }}
            />
            <Input
              id="projectName"
              name="projectName"
              disabled
              value={data.listings.projectName}
            />
          </div>
        </div>

        <LandAreaInput form={form} value={listing.landArea || "20"} />
        <BuiltUpAreaInput form={form} value={listing.builtUpArea || "30"} />
        <PriceInput form={form} value={listing.price || "1000"} />
      </div>
    </div>
  );
};

export default ListingForm;
