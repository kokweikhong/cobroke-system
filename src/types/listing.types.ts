import { InferSelectModel } from "drizzle-orm";
import * as schema from "@/db/schema";

export type MatchListingFormValues = {
  listingId: string;
  listingType: string;
  propertyType: string;
  tenure: string;
  propertyStatus: string;
  projectName: string;
  minLandArea: number;
  maxLandArea: number;
  minBuiltUpArea: number;
  maxBuiltUpArea: number;
  minPrice: number;
  maxPrice: number;
  // landArea: string;
  // builtUpArea: string;
  // price: string;
  address: {
    city: string;
    state: string;
  };
  residential: {
    propertySubType: string;
    minBedrooms: number;
    maxBedrooms: number;
    minBathrooms: number;
    maxBathrooms: number;
    minCarParks: number;
    maxCarParks: number;
    furnishing: string;
  };
  commercial: {
    propertySubType: string;
    furnishing: string;
  };
  industrial: {
    propertySubType: string;
    minFloorLoading: number;
    maxFloorLoading: number;
    minEavesHeight: number;
    maxEavesHeight: number;
    minPowerSupply: number;
    maxPowerSupply: number;
    isGasSupply: boolean;
    usage: string;
  };
  land: {
    propertySubType: string;
    status: string;
    reserve: string;
  };
};

export type SelectListing = InferSelectModel<typeof schema.listings>;
export type SelectPropertyAddress = InferSelectModel<
  typeof schema.propertyAddresses
>;
export type SelectClient = InferSelectModel<typeof schema.clients>;
export type SelectResidential = InferSelectModel<typeof schema.residentials>;
export type SelectCommercial = InferSelectModel<typeof schema.commercials>;
export type SelectIndustrial = InferSelectModel<typeof schema.industrials>;
export type SelectLand = InferSelectModel<typeof schema.lands>;

export type UpdateListing = {
  listing: SelectListing;
  propertyAddress: SelectPropertyAddress;
  client: SelectClient;
  residential?: SelectResidential;
  commercial?: SelectCommercial;
  industrial?: SelectIndustrial;
  land?: SelectLand;
};
