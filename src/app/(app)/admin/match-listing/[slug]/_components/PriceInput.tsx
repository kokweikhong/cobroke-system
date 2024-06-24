"use client";

import { UseFormReturn } from "react-hook-form";
import { MatchListingFormValues } from "@/types/listing.types";
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
              if (!checked) {
                form.setValue("minPrice", 0);
                form.setValue("maxPrice", 0);
              }
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
              const minPrice = parseFloat(value) - parseFloat(value) * e[0];
              const maxPrice = parseFloat(value) + parseFloat(value) * e[0];
              console.log(minPrice, maxPrice);
              form.setValue("minPrice", minPrice);
              form.setValue("maxPrice", maxPrice);
            }}
          />
          <p className="text-sm text-gray-500 text-center">
            {form.watch("minPrice")?.toLocaleString() +
              " - " +
              form.watch("maxPrice")?.toLocaleString() +
              " RM"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceInput;
