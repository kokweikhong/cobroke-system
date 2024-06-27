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
  furnishings,
  landReserves,
  landStatues,
  propertySubType,
} from "@/constants/listing.constants";
import { ListingWithJoins } from "@/types/listings";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

type LandFormProps = {
  form: UseFormReturn<ListingWithJoins>;
};

const LandForm: FC<LandFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="lands.id"
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
        name="lands.propertySubType"
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
                {propertySubType.land.map((item) => (
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
        name="lands.status"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="capitalize">
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {landStatues.map((status) => (
                  <SelectItem
                    key={status}
                    value={status}
                    className="capitalize"
                  >
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lands.reserve"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reserve</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="capitalize">
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {landReserves.map((reserve) => (
                  <SelectItem
                    key={reserve}
                    value={reserve}
                    className="capitalize"
                  >
                    {reserve}
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

export default LandForm;
