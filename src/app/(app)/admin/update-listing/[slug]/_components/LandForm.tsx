import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { furnishings, propertySubType } from "@/constants/listing.constants";
import { UpdateListing } from "@/types/listing.types";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

type LandFormProps = {
  form: UseFormReturn<UpdateListing>;
};

const LandForm: FC<LandFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="land.listingId"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Listing ID</FormLabel>
            <FormControl>
              <Input
                value={field.value as string}
                onChange={field.onChange}
                disabled
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="land.propertySubType"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Sub Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Select a verified property sub type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {propertySubType.land.map((subType) => (
                  <SelectItem
                    key={subType}
                    value={subType}
                    className="capitalize"
                  >
                    {subType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="land.status"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Select a verified status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {propertySubType.land.map((subType) => (
                  <SelectItem
                    key={subType}
                    value={subType}
                    className="capitalize"
                  >
                    {subType}
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
