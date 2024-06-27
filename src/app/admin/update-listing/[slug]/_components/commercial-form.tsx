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

type CommercialFormProps = {
  form: UseFormReturn<ListingWithJoins>;
};

const CommercialForm: FC<CommercialFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="commercials.id"
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
        name="commercials.propertySubType"
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
                {propertySubType.commerical.map((item) => (
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
        name="commercials.furnishing"
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

export default CommercialForm;
