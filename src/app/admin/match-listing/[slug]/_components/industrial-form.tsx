"use client";

import { ListingWithJoins, MatchListingFormValues } from "@/types/listings";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import FloorLoadingInput from "./floor-loading-input";
import EavesHeightInput from "./eavesheight-input";
import PowerSupplyInput from "./power-supply-input";

type IndustrialFormProps = {
  form: UseFormReturn<MatchListingFormValues>;
  data: ListingWithJoins;
};

const IndustrialForm: FC<IndustrialFormProps> = ({ form, data }) => {
  return (
    <div className="py-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold tracking-wide text-gray-700">
          Industrial Details
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

        <FloorLoadingInput
          value={data.residentials?.bedrooms.toString() || "1"}
          form={form}
        />
        <EavesHeightInput
          value={data.residentials?.bathrooms.toString() || "1"}
          form={form}
        />
        <PowerSupplyInput
          value={data.residentials?.carParks.toString() || "1"}
          form={form}
        />

        <div>
          <Label htmlFor="industrial-usage">Usage</Label>
          <div className="flex gap-x-2 items-center">
            <Switch
              onCheckedChange={(checked) => {
                if (checked) {
                  form.setValue(
                    "industrial.usage",
                    data.industrials?.usage || ""
                  );
                } else {
                  form.setValue("industrial.usage", "");
                }
              }}
            />
            <Input
              id="industrial-usage"
              name="industrial-usage"
              className="capitalize"
              disabled
              value={data.industrials?.usage}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="industrial-gaspipe">Gas Pipe</Label>
          <div className="flex gap-x-2 items-center">
            <Switch
              checked={form.watch("industrial.isGasSupply")}
              onCheckedChange={(checked) => {
                if (checked) {
                  form.setValue("industrial.isGasSupply", true);
                } else {
                  form.setValue("industrial.isGasSupply", false);
                }
              }}
            />
            <Input
              id="industrial-gaspipe"
              name="industrial-gaspipe"
              className="capitalize"
              disabled
              value={form.watch("industrial.isGasSupply") ? "Yes" : "Any"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustrialForm;
