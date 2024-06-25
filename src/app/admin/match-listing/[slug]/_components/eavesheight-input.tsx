"use client";

import { UseFormReturn } from "react-hook-form";
import { MatchListingFormValues } from "@/types/listings";
import { FC, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ReactSlider from "react-slider";
import { parse } from "path";

type EavesHeightInputProps = {
  form: UseFormReturn<MatchListingFormValues>;
  value: string;
};

const EavesHeightInput: FC<EavesHeightInputProps> = ({ form, value }) => {
  const [exact, setExact] = useState(false);
  return (
    <div className="py-4">
      <div>
        <Label htmlFor="eavesheight">Eaves Height</Label>
        <div className="space-y-4">
          <div className="flex gap-x-2 items-center">
            <Switch
              checked={exact}
              onCheckedChange={(checked) => {
                if (!checked) {
                  form.setValue("industrial.minEavesHeight", 0);
                  form.setValue("industrial.maxEavesHeight", 0);
                }
                setExact(checked);
              }}
            />
            <Input id="eavesheight" name="eavesheight" value={value} disabled />
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
                pearling
                minDistance={1}
                onChange={(value) => {
                  form.setValue(
                    "industrial.minEavesHeight",
                    parseFloat(value[0].toFixed(2))
                  );
                  form.setValue(
                    "industrial.maxEavesHeight",
                    parseFloat(value[1].toFixed(2))
                  );
                }}
              />
              <p className="mx-auto text-center mt-2 text-sm text-gray-500">
                {form.watch("industrial.minEavesHeight")} -{" "}
                {form.watch("industrial.maxEavesHeight")} Height
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EavesHeightInput;
