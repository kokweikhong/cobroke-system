"use client";

import { UseFormReturn } from "react-hook-form";
import { MatchListingFormValues } from "@/types/listings";
import { FC, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ReactSlider from "react-slider";

type CarparksInputProps = {
  form: UseFormReturn<MatchListingFormValues>;
  value: string;
};

const CarparksInput: FC<CarparksInputProps> = ({ form, value }) => {
  const [exact, setExact] = useState(false);
  return (
    <div className="py-4">
      <div>
        <Label htmlFor="price">Carparks</Label>
        <div className="space-y-4">
          <div className="flex gap-x-2 items-center">
            <Switch
              checked={exact}
              onCheckedChange={(checked) => {
                if (!checked) {
                  form.setValue("residential.minCarParks", 0);
                  form.setValue("residential.maxCarParks", 0);
                } else {
                  form.setValue("residential.minCarParks", 1);
                  form.setValue("residential.maxCarParks", 2);
                }
                setExact(checked);
              }}
            />
            <Input id="carparks" name="carparks" value={value} disabled />
          </div>
          <div
            className={cn(
              "space-y-2",
              cn("w-full", exact ? "block" : "hidden"),
            )}
          >
            <div>
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                defaultValue={[1, 2]}
                min={1}
                max={11}
                ariaLabel={["Lower thumb", "Upper thumb"]}
                ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                pearling
                minDistance={1}
                value={[
                  form.watch("residential.minCarParks"),
                  form.watch("residential.maxCarParks"),
                ]}
                onChange={(value) => {
                  form.setValue("residential.minCarParks", value[0]);
                  form.setValue("residential.maxCarParks", value[1]);
                }}
              />
              <p className="mx-auto text-center mt-2 text-sm text-gray-500">
                {form.watch("residential.minCarParks")} -{" "}
                {form.watch("residential.maxCarParks")} Carparks
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarparksInput;
