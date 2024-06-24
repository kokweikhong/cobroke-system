"use client";

import { UseFormReturn } from "react-hook-form";
import { MatchListingFormValues } from "@/types/listings";
import { FC, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { renderValueByPercentage } from "../utils";

type LandAreaInputProps = {
  form: UseFormReturn<MatchListingFormValues>;
  value: string;
};

const LandAreaInput: FC<LandAreaInputProps> = ({ form, value }) => {
  const [exact, setExact] = useState(false);
  return (
    <div>
      <Label htmlFor="landArea">Land Area</Label>
      <div className="space-y-4">
        <div className="flex gap-x-2 items-center">
          <Switch
            checked={exact}
            onCheckedChange={(checked) => {
              if (!checked) {
                form.setValue("minLandArea", 0);
                form.setValue("maxLandArea", 0);
              }
              setExact(checked);
            }}
          />
          <Input id="landArea" name="landArea" value={value} disabled />
        </div>
        <div
          className={cn("space-y-2", cn("w-full", exact ? "block" : "hidden"))}
        >
          <Slider
            defaultValue={[0]}
            max={1}
            step={0.05}
            onValueChange={(e) => {
              const minLandArea = parseFloat(value) - parseFloat(value) * e[0];
              const maxLandArea = parseFloat(value) + parseFloat(value) * e[0];
              form.setValue("minLandArea", minLandArea);
              form.setValue("maxLandArea", maxLandArea);
            }}
          />
          <p className="text-sm text-gray-500 text-center">
            {form.watch("minLandArea").toLocaleString() +
              " - " +
              form.watch("maxLandArea").toLocaleString() +
              " sqft"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandAreaInput;
