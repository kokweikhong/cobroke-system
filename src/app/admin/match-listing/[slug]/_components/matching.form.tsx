"use client";

import { Form } from "@/components/ui/form";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ExportListing,
  ListingWithJoins,
  MatchListingFormValues,
} from "@/types/listings";
import ResidentialForm from "./residential-form";
import CommercialForm from "./commercial-form";
import IndustrialForm from "./industrial-form";
import LandForm from "./land-form";
import { getOppositeListingType } from "@/lib/listing-type";
import ListingForm from "./listing-form";
import { getFilteredListings } from "@/actions/listings";
import { toast } from "sonner";
import { generateMockListingsWithJoin } from "@/mocks/listings";
import { convertListingWithJoinsToExportListing } from "@/lib/listings";

type MatchingFormProps = {
  data: ListingWithJoins;
  setResult: (result: ExportListing[]) => void;
  setActiveTab: (tab: string) => void;
};

const MatchingForm: FC<MatchingFormProps> = ({
  data,
  setResult,
  setActiveTab,
}) => {
  const listing = data.listings;
  const formDefaultValues: MatchListingFormValues = {
    listingId: data.listings.id,
    listingType: getOppositeListingType(data.listings.listingType),
    propertyStatus: "",
    tenure: "",
    projectName: "",
    propertyType: data.listings.propertyType,
    minLandArea: 0,
    maxLandArea: 0,
    minBuiltUpArea: 0,
    maxBuiltUpArea: 0,
    minPrice: 0,
    maxPrice: 0,
    address: {
      city: "",
      state: "",
    },
    residential: {
      propertySubType: "",
      minBedrooms: 0,
      maxBedrooms: 0,
      minBathrooms: 0,
      maxBathrooms: 0,
      minCarParks: 0,
      maxCarParks: 0,
      furnishing: "",
    },
    commercial: {
      propertySubType: "",
      furnishing: "",
    },
    industrial: {
      propertySubType: "",
      minFloorLoading: 0,
      maxFloorLoading: 0,
      minEavesHeight: 0,
      maxEavesHeight: 0,
      minPowerSupply: 0,
      maxPowerSupply: 0,
      usage: "",
      isGasSupply: false,
    },
    land: {
      propertySubType: "",
      status: "",
      reserve: "",
    },
  };
  const form = useForm<MatchListingFormValues>({
    defaultValues: formDefaultValues,
  });

  async function onSubmit(values: MatchListingFormValues) {
    console.log(values);
    toast("Are you sure you want to match this listing?", {
      action: {
        label: "Match",
        onClick: async () => {
          const listings = await getFilteredListings(values);
          const exportListings = listings.map((listing) =>
            convertListingWithJoinsToExportListing(listing)
          );
          setResult(exportListings);
          setActiveTab("matching-result");
        },
      },
    });
  }
  return (
    <div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <ListingForm form={form} data={data} />

          <Separator className="!mt-8" />
          {listing.propertyType === "residential" && (
            <ResidentialForm form={form} data={data} />
          )}
          {listing.propertyType === "commercial" && (
            <CommercialForm form={form} data={data} />
          )}
          {listing.propertyType === "industrial" && (
            <IndustrialForm form={form} data={data} />
          )}
          {listing.propertyType === "land" && (
            <LandForm form={form} data={data} />
          )}
          <div>
            <Button type="submit">Match Listing</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MatchingForm;
