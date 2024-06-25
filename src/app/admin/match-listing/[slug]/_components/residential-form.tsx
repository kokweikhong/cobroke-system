"use client";

import { ListingWithJoins, MatchListingFormValues } from "@/types/listings";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import ReactSlider from "react-slider";
import BedroomsInput from "./bedrooms-input";
import BathroomsInput from "./bathrooms-input";
import CarparksInput from "./carparks-input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type ResidentialFormProps = {
  form: UseFormReturn<MatchListingFormValues>;
  data: ListingWithJoins;
};

const ResidentialForm: FC<ResidentialFormProps> = ({ form, data }) => {
  return (
    <div className="py-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold tracking-wide text-gray-700">
          Residential Details
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="residential-propertySubType">Property Sub Type</Label>
          <div className="flex gap-x-2 items-center">
            <Switch
              onCheckedChange={(checked) => {
                if (checked) {
                  form.setValue(
                    "residential.propertySubType",
                    data.residentials?.propertySubType || ""
                  );
                } else {
                  form.setValue("residential.propertySubType", "");
                }
              }}
            />
            <Input
              id="residential-propertySubType"
              name="residential-propertySubType"
              className="capitalize"
              disabled
              value={data.residentials?.propertySubType}
            />
          </div>
        </div>

        <BedroomsInput
          value={data.residentials?.bedrooms.toString() || "1"}
          form={form}
        />
        <BathroomsInput
          value={data.residentials?.bathrooms.toString() || "1"}
          form={form}
        />
        <CarparksInput
          value={data.residentials?.carParks.toString() || "1"}
          form={form}
        />

        <div>
          <Label htmlFor="residential-furnishing">Furnishing</Label>
          <div className="flex gap-x-2 items-center">
            <Switch
              onCheckedChange={(checked) => {
                if (checked) {
                  form.setValue(
                    "residential.furnishing",
                    data.residentials?.furnishing || ""
                  );
                } else {
                  form.setValue("residential.furnishing", "");
                }
              }}
            />
            <Input
              id="residential-furnishing"
              name="residential-furnishing"
              className="capitalize"
              disabled
              value={data.residentials?.furnishing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentialForm;
