"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  industrialUsages,
  propertySubType,
} from "@/constants/listing.constants";
import { ListingWithJoins } from "@/types/listings";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

type IndustrialFormProps = {
  form: UseFormReturn<ListingWithJoins>;
};

const IndustrialForm: FC<IndustrialFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="industrials.id"
        defaultValue={0}
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID</FormLabel>
            <FormControl>
              <Input {...field} disabled />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="industrials.propertySubType"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Sub Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Select a verified property type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {propertySubType.industrial.map((item) => (
                  <SelectItem key={item} value={item} className="capitalize">
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="industrials.floorLoading"
        defaultValue={"0"}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Floor Loading (KN)</FormLabel>
            <FormControl>
              <Input type="number" step={0.01} {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="industrials.eavesHeight"
        defaultValue={"0"}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Eaves Height</FormLabel>
            <FormControl>
              <Input type="number" step={0.01} {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="industrials.powerSupply"
        defaultValue={"0"}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Power Supply (Amp)</FormLabel>
            <FormControl>
              <Input type="number" step={1} {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="industrials.usage"
        defaultValue="light"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Usage</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="capitalize">
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {industrialUsages.map((usage) => (
                  <SelectItem key={usage} value={usage} className="capitalize">
                    {usage}
                  </SelectItem>
                ))}
                <SelectItem value="fully">Fully Furnished</SelectItem>
                <SelectItem value="partially">Partially Furnished</SelectItem>
                <SelectItem value="unfurnished">Unfurnished</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="industrials.isGasSupply"
        defaultValue={false}
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2 justify-start">
            <FormControl>
              <Input
                type="checkbox"
                className="h-5 w-5"
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
              />
            </FormControl>
            <FormLabel className="!mt-0">Gas Supply</FormLabel>
          </FormItem>
        )}
      />
    </div>
  );
};

export default IndustrialForm;
