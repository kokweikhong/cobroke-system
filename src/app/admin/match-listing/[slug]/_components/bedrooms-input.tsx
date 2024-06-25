"use client";

import { UseFormReturn } from "react-hook-form";
import { MatchListingFormValues } from "@/types/listings";
import { FC, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ReactSlider from "react-slider";

type BedroomsInputProps = {
  form: UseFormReturn<MatchListingFormValues>;
  value: string;
};

const BedroomsInput: FC<BedroomsInputProps> = ({ form, value }) => {
  const [exact, setExact] = useState(false);
  return (
    <div className="py-4">
      <div>
        <Label htmlFor="price">Bedrooms</Label>
        <div className="space-y-4">
          <div className="flex gap-x-2 items-center">
            <Switch
              checked={exact}
              onCheckedChange={(checked) => {
                if (!checked) {
                  form.setValue("residential.minBedrooms", 0);
                  form.setValue("residential.maxBathrooms", 0);
                }
                setExact(checked);
              }}
            />
            <Input id="bedrooms" name="bedrooms" value={value} disabled />
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
                defaultValue={[1, 4]}
                min={1}
                max={11}
                ariaLabel={["Lower thumb", "Upper thumb"]}
                ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                // renderThumb={(props, state) => <div {...props}></div>}
                pearling
                minDistance={1}
                onChange={(value) => {
                  form.setValue("residential.minBedrooms", value[0]);
                  form.setValue("residential.maxBedrooms", value[1]);
                }}
              />
              <p className="mx-auto text-center mt-2 text-sm text-gray-500">
                {form.watch("residential.minBedrooms")} -{" "}
                {form.watch("residential.maxBedrooms")} Bedrooms
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BedroomsInput;
