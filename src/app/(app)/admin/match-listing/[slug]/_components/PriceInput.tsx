"use client";

import { UseFormReturn } from "react-hook-form";
import { MatchListingFormValues } from "./MatchListingForm";
import { FC, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { renderValueByPercentage } from "../utils";

type PriceInputProps = {
  form: UseFormReturn<MatchListingFormValues>;
  value: string;
};

const PriceInput: FC<PriceInputProps> = ({ form, value }) => {
  const [exact, setExact] = useState(false);
  return (
    <div>
      <Label htmlFor="price">Price</Label>
      <div className="space-y-4">
        <div className="flex gap-x-2 items-center">
          <Switch
            checked={exact}
            onCheckedChange={(checked) => {
              form.setValue("price", "0");
              setExact(checked);
            }}
          />
          <Input id="price" name="price" value={value} disabled />
        </div>
        <div
          className={cn("space-y-2", cn("w-full", exact ? "block" : "hidden"))}
        >
          <Slider
            defaultValue={[0]}
            max={1}
            step={0.05}
            onValueChange={(e) => {
              form.setValue("price", e[0].toString());
            }}
          />
          <p className="text-sm text-gray-500 flex justify-center">
            <span className="mx-auto">
              {renderValueByPercentage(value, form.watch("price"), "sqft")}
            </span>
            <span>
              {(parseFloat(form.watch("price")) * 100).toFixed(0) + " %"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceInput;
