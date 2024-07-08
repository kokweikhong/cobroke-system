import type { ListingWithJoins, ExportListing } from "@/types/listings";

export function convertListingWithJoinsToExportListing(data: ListingWithJoins) {
  let exportListing: ExportListing = {
    listing_id: data.listings.id,
    project_name: data.listings.projectName,
    listing_type: data.listings.listingType,
    tenure: data.listings.tenure,
    property_status: data.listings.propertyStatus,
    land_area: parseFloat(data.listings.landArea),
    built_up_area: parseFloat(data.listings.builtUpArea),
    price: parseFloat(data.listings.price),
    current_rental: parseFloat(data.listings.currentRental),
    description: data.listings.description,
    city: data.propertyAddresses?.city || "",
    state: data.propertyAddresses?.state || "",
    agent_first_name: data.users?.firstName || "",
    agent_last_name: data.users?.lastName || "",
    agent_email: data.users?.email || "",
    agent_contact: data.users?.contactNumber || "",
    property_type: data.listings.propertyType,
  };

  if (data.listings.propertyType === "residential") {
    exportListing = {
      ...exportListing,
      property_type: data.listings?.propertyType || "",
      property_sub_type: data.residentials?.propertySubType || "",
      bedrooms: data.residentials?.bedrooms || 0,
      bathrooms: data.residentials?.bathrooms || 0,
      car_parks: data.residentials?.carParks || 0,
      furnishing: data.residentials?.furnishing || "",
    };
  } else if (data.listings.propertyType === "commercial") {
    exportListing = {
      ...exportListing,
      property_type: data.listings?.propertyType || "",
      property_sub_type: data.commercials?.propertySubType || "",
      furnishing: data.commercials?.furnishing || "",
    };
  } else if (data.listings.propertyType === "industrial") {
    exportListing = {
      ...exportListing,
      property_type: data.listings?.propertyType || "",
      property_sub_type: data.industrials?.propertySubType || "",
      floor_loading: parseFloat(data.industrials?.floorLoading || "0"),
      eaves_height: parseFloat(data.industrials?.eavesHeight || "0"),
      power_supply: parseFloat(data.industrials?.powerSupply || "0"),
      usage: data.industrials?.usage || "",
      gas_supply: data.industrials?.isGasSupply || false,
    };
  } else if (data.listings.propertyType === "land") {
    exportListing = {
      ...exportListing,
      property_type: data.listings?.propertyType || "",
      property_sub_type: data.lands?.propertySubType || "",
      status: data.lands?.status || "",
      reserve: data.lands?.reserve || "",
    };
  }

  return exportListing;
}
