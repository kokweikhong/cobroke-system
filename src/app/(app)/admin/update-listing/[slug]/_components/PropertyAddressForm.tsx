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
import { addressStates } from "@/constants/listing.constants";
import { UpdateListing } from "@/types/listing.types";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

type PropertyAddressFormProps = {
  form: UseFormReturn<UpdateListing>;
};

const PropertyAddressForm: FC<PropertyAddressFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="propertyAddress.addressLine1"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address Line 1</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter property address 1" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="propertyAddress.addressLine2"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address Line 2</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter property address 2" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="propertyAddress.postalCode"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Postal Code</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter property postal code" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="propertyAddress.city"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter property city" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="propertyAddress.state"
        defaultValue="kuala lumpur"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Select a verified property state" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {addressStates.map((state) => (
                  <SelectItem key={state} value={state} className="capitalize">
                    {state}
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

export default PropertyAddressForm;
