"use client";

import { UseFormReturn } from "react-hook-form";
import { MatchListingFormValues } from "@/types/listings";
import { FC, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ReactSlider from "react-slider";

type PowerSupplyInputProps = {
  form: UseFormReturn<MatchListingFormValues>;
  value: string;
};

const PowerSupplyInput: FC<PowerSupplyInputProps> = ({ form, value }) => {
  const [exact, setExact] = useState(false);
  return (
    <div className="py-4">
      <div>
        <Label htmlFor="power-supply-input">Power Supply (AMP)</Label>
        <div className="space-y-4">
          <div className="flex gap-x-2 items-center">
            <Switch
              checked={exact}
              onCheckedChange={(checked) => {
                if (!checked) {
                  form.setValue("industrial.minPowerSupply", 0);
                  form.setValue("industrial.maxPowerSupply", 0);
                }
                setExact(checked);
              }}
            />
            <Input
              id="power-supply-input"
              name="power-supply"
              value={value}
              disabled
            />
          </div>
          <div
            className={cn(
              "space-y-2",
              cn("w-full", exact ? "block" : "hidden")
            )}
          >
            <div>
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                defaultValue={[1, 100]}
                min={1}
                max={1000}
                ariaLabel={["Lower thumb", "Upper thumb"]}
                ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                pearling
                minDistance={1}
                onChange={(value) => {
                  form.setValue("industrial.minPowerSupply", value[0]);
                  form.setValue("industrial.maxPowerSupply", value[1]);
                }}
              />
              <p className="mx-auto text-center mt-2 text-sm text-gray-500">
                {form.watch("industrial.minPowerSupply")} -{" "}
                {form.watch("industrial.maxPowerSupply")} Amp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerSupplyInput;
