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
import { furnishings, propertySubType } from "@/constants/listing.constants";
import { ListingWithJoins } from "@/types/listings";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

type ResidentialFormProps = {
  form: UseFormReturn<ListingWithJoins>;
};

const ResidentialForm: FC<ResidentialFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="residentials.id"
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
        name="residentials.propertySubType"
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
                {propertySubType.residential.map((item) => (
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
        name="residentials.bedrooms"
        defaultValue={0}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bedrooms</FormLabel>
            <FormControl>
              <Input
                type="number"
                step={1}
                value={field.value}
                onChange={(e) => {
                  field.onChange(parseInt(e.target.value));
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="residentials.bathrooms"
        defaultValue={0}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bathrooms</FormLabel>
            <FormControl>
              <Input
                type="number"
                step={1}
                {...field}
                value={field.value}
                onChange={(e) => {
                  field.onChange(parseInt(e.target.value));
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="residentials.carParks"
        defaultValue={0}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Car Parks</FormLabel>
            <FormControl>
              <Input
                type="number"
                step={1}
                {...field}
                value={field.value}
                onChange={(e) => {
                  field.onChange(parseInt(e.target.value));
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="residentials.furnishing"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Furnishing</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Select a verified furnishing" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {furnishings.map((furnishing) => (
                  <SelectItem
                    key={furnishing}
                    value={furnishing}
                    className="capitalize"
                  >
                    {furnishing}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ResidentialForm;
