import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import * as schema from "@/db/schema";

export type SelectUser = InferSelectModel<typeof schema.users>;

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

export type ListingWithJoins = {
  listings: SelectListing;
  propertyAddresses: SelectPropertyAddress | null;
  clients: SelectClient | null;
  users: SelectUser | null;
  residentials: SelectResidential | null;
  commercials: SelectCommercial | null;
  industrials: SelectIndustrial | null;
  lands: SelectLand | null;
};

export type UpdateListing = {
  listing: SelectListing;
  propertyAddress: SelectPropertyAddress;
  client: SelectClient;
  residential?: SelectResidential;
  commercial?: SelectCommercial;
  industrial?: SelectIndustrial;
  land?: SelectLand;
};

export type ExportListing =
  | {
      listing_id: string;
      project_name: string;
      listing_type: string;

      tenure: string;
      property_status: string;
      land_area: number;
      built_up_area: number;
      price: number;
      current_rental: number;
      description: string;
      city: string;
      state: string;
      agent_first_name: string;
      agent_last_name: string;
      agent_email: string;
      agent_contact: string;
    }
  | {
      property_type: "residential";
      property_sub_type: string;
      bedrooms: number;
      bathrooms: number;
      car_parks: number;
      furnishing: string;
    }
  | {
      property_type: "commercial";
      property_sub_type: string;
      furnishing: string;
    }
  | {
      property_type: "industrial";
      property_sub_type: string;
      floor_loading: number;
      eaves_height: number;
      power_supply: number;
      gas_supply: boolean;
      usage: string;
    }
  | {
      property_type: "land";
      property_sub_type: string;
      status: string;
      reserve: string;
    };

export type InsertListing = InferInsertModel<typeof schema.listings>;
