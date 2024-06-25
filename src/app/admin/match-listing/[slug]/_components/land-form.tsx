"use client";

import { ListingWithJoins, MatchListingFormValues } from "@/types/listings";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

type LandFormProps = {
  form: UseFormReturn<MatchListingFormValues>;
  data: ListingWithJoins;
};

const LandForm: FC<LandFormProps> = ({ form, data }) => {
  return (
    <div className="py-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold tracking-wide text-gray-700">
          Land Details
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="land-propertySubType">Property Sub Type</Label>
          <div className="flex gap-x-2 items-center">
            <Switch
              onCheckedChange={(checked) => {
                if (checked) {
                  form.setValue(
                    "commercial.propertySubType",
                    data.lands?.propertySubType || ""
                  );
                } else {
                  form.setValue("land.propertySubType", "");
                }
              }}
            />
            <Input
              id="land-propertySubType"
              name="land-propertySubType"
              className="capitalize"
              disabled
              value={data.lands?.propertySubType}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="land-status">Status</Label>
          <div className="flex gap-x-2 items-center">
            <Switch
              onCheckedChange={(checked) => {
                if (checked) {
                  form.setValue("land.status", data.lands?.status || "");
                } else {
                  form.setValue("land.status", "");
                }
              }}
            />
            <Input
              id="land-status"
              name="land-status"
              className="capitalize"
              disabled
              value={data.lands?.status}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="land-reserve">Reserve</Label>
          <div className="flex gap-x-2 items-center">
            <Switch
              onCheckedChange={(checked) => {
                if (checked) {
                  form.setValue("land.reserve", data.lands?.reserve || "");
                } else {
                  form.setValue("land.reserve", "");
                }
              }}
            />
            <Input
              id="land-reserve"
              name="land-reserve"
              className="capitalize"
              disabled
              value={data.lands?.reserve}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandForm;
