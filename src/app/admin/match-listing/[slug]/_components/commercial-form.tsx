"use client";

import { ListingWithJoins, MatchListingFormValues } from "@/types/listings";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

type CommercialFormProps = {
  form: UseFormReturn<MatchListingFormValues>;
  data: ListingWithJoins;
};

const CommercialForm: FC<CommercialFormProps> = ({ form, data }) => {
  return (
    <div className="py-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold tracking-wide text-gray-700">
          Commercial Details
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="commercial-propertySubType">Property Sub Type</Label>
          <div className="flex gap-x-2 items-center">
            <Switch
              onCheckedChange={(checked) => {
                if (checked) {
                  form.setValue(
                    "commercial.propertySubType",
                    data.commercials?.propertySubType || ""
                  );
                } else {
                  form.setValue("commercial.propertySubType", "");
                }
              }}
            />
            <Input
              id="commercial-propertySubType"
              name="commercial-propertySubType"
              className="capitalize"
              disabled
              value={data.commercials?.propertySubType}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="commercial-furnishing">Furnishing</Label>
          <div className="flex gap-x-2 items-center">
            <Switch
              onCheckedChange={(checked) => {
                if (checked) {
                  form.setValue(
                    "commercial.furnishing",
                    data.commercials?.furnishing || ""
                  );
                } else {
                  form.setValue("commercial.furnishing", "");
                }
              }}
            />
            <Input
              id="commercial-furnishing"
              name="commercial-furnishing"
              className="capitalize"
              disabled
              value={data.commercials?.furnishing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialForm;
