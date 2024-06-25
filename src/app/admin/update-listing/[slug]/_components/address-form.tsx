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
import { ListingWithJoins } from "@/types/listings";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

type AddressFormProps = {
  form: UseFormReturn<ListingWithJoins>;
};

const AddressForm: FC<AddressFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="propertyAddresses.id"
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
        name="propertyAddresses.addressLine1"
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
        name="propertyAddresses.addressLine2"
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
        name="propertyAddresses.postalCode"
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
        name="propertyAddresses.city"
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
        name="propertyAddresses.state"
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

export default AddressForm;
