"use client";

import { MatchListingFormValues } from "@/types/listing.types";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import ReactSlider from "react-slider";
import BedroomsInput from "./BedroomsInput";

type ResidentialFormProps = {
  form: UseFormReturn<MatchListingFormValues>;
};

const ResidentialForm: FC<ResidentialFormProps> = ({ form }) => {
  return (
    <div className="py-4">
      <BedroomsInput value={"1"} form={form} />
    </div>
  );
};

export default ResidentialForm;
