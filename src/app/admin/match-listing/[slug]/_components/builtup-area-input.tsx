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

type BuiltUpAreaInputProps = {
  form: UseFormReturn<MatchListingFormValues>;
  value: string;
};

const BuiltUpAreaInput: FC<BuiltUpAreaInputProps> = ({ form, value }) => {
  const [exact, setExact] = useState(false);
  return (
    <div>
      <Label htmlFor="builtUpArea">Built Up Area</Label>
      <div className="space-y-4">
        <div className="flex gap-x-2 items-center">
          <Switch
            checked={exact}
            onCheckedChange={(checked) => {
              if (!checked) {
                form.setValue("minBuiltUpArea", 0);
                form.setValue("maxBuiltUpArea", 0);
              }
              setExact(checked);
            }}
          />
          <Input id="builtUpArea" name="builtUpArea" value={value} disabled />
        </div>
        <div
          className={cn("space-y-2", cn("w-full", exact ? "block" : "hidden"))}
        >
          <Slider
            defaultValue={[0]}
            max={1}
            step={0.05}
            onValueChange={(e) => {
              const minBuiltUpArea =
                parseFloat(value) - parseFloat(value) * e[0];
              const maxBuiltUpArea =
                parseFloat(value) + parseFloat(value) * e[0];
              form.setValue(
                "minBuiltUpArea",
                parseFloat(minBuiltUpArea.toFixed(2))
              );
              form.setValue(
                "maxBuiltUpArea",
                parseFloat(maxBuiltUpArea.toFixed(2))
              );
            }}
          />
          <p className="text-sm text-gray-500 text-center">
            {form.watch("minBuiltUpArea").toLocaleString() +
              " - " +
              form.watch("maxBuiltUpArea").toLocaleString() +
              " sqft"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuiltUpAreaInput;
