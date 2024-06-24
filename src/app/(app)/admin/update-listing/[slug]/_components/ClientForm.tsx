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

type ClientFormProps = {
  form: UseFormReturn<UpdateListing>;
};

const ClientForm: FC<ClientFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="client.listingId"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Listing ID</FormLabel>
            <FormControl>
              {/* <Input {...field} placeholder="Enter client name" /> */}
              {/* <Input {...field} /> */}
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="client.name"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter client name" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="client.email"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Email</FormLabel>
            <FormControl>
              <Input type="email" {...field} placeholder="Enter client email" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="client.contactNumber"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Contact</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter client contact" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ClientForm;
