"use server";

import db from "@/db";
import * as schema from "@/db/schema";
import { and, eq, gte, ilike, lte, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuthSession } from "./session";
import { ListingWithJoins, MatchListingFormValues } from "@/types/listings";
import { getMinMaxValuesByPercentage } from "@/lib/utils";
import { validateNumber, validateValue } from "@/lib/validations";

export async function createListing(formData: FormData) {
  const listings = await db
    .insert(schema.listings)
    .values({
      userId: formData.get("userId") as string,
      projectName: formData.get("projectName") as string,
      listingType: formData.get("listingType") as any,
      listingCategory: formData.get("listingCategory") as any,
      propertyType: formData.get("propertyType") as any,
      tenure: formData.get("tenure") as string,
      propertyStatus: formData.get("propertyStatus") as string,
      landArea: "0.00" as any,
      builtUpArea: "0.00" as any,
      price: "0.00" as any,
      currentRental: "0.00" as any,
      description: formData.get("description") as string,
      isActive: false,
      isAvailable: false,
    })
    .returning({
      id: schema.listings.id,
      propertyType: schema.listings.propertyType,
    });
  const listing = listings[0];
  await db.insert(schema.propertyAddresses).values({
    listingId: listing.id,
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
  });
  await db.insert(schema.clients).values({
    listingId: listing.id,
    name: "",
    contactNumber: "",
    email: "",
  });

  if (listing.propertyType === "residential") {
    await db.insert(schema.residentials).values({
      listingId: listing.id,
      propertySubType: "",
      bedrooms: 0,
      bathrooms: 0,
      carParks: 0,
      furnishing: "",
    });
  } else if (listing.propertyType === "commercial") {
    await db.insert(schema.commercials).values({
      listingId: listing.id,
      propertySubType: "",
      furnishing: "",
    });
  } else if (listing.propertyType === "industrial") {
    await db.insert(schema.industrials).values({
      listingId: listing.id,
      propertySubType: "",
      floorLoading: "0.00",
      eavesHeight: "0.00",
      powerSupply: "0",
      isGasSupply: false,
      usage: "",
    });
  } else if (listing.propertyType === "land") {
    await db.insert(schema.lands).values({
      listingId: listing.id,
      propertySubType: "",
      status: "",
      reserve: "",
    });
  } else {
    await db.delete(schema.listings).where(eq(schema.listings.id, listing.id));
    throw new Error("Invalid property type");
  }

  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function updateListing(formData: FormData) {
  const listingId = formData.get("listingId") as string;
  await db
    .update(schema.listings)
    .set({
      projectName: formData.get("projectName") as string,
      listingType: formData.get("listingType") as any,
      listingCategory: formData.get("listingCategory") as any,
      propertyType: formData.get("propertyType") as any,
      tenure: formData.get("tenure") as string,
      propertyStatus: formData.get("propertyStatus") as string,
      description: formData.get("description") as string,
    })
    .where(eq(schema.listings.id, listingId));
  await updateListingStatus(listingId);
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function updateListingStatus(listingId: string) {
  let isActive = false;
  const listings = await db
    .select()
    .from(schema.listings)
    .leftJoin(
      schema.propertyAddresses,
      eq(schema.propertyAddresses.listingId, schema.listings.id)
    )
    .leftJoin(schema.clients, eq(schema.clients.listingId, schema.listings.id))
    .leftJoin(
      schema.residentials,
      eq(schema.residentials.listingId, schema.listings.id)
    )
    .leftJoin(
      schema.commercials,
      eq(schema.commercials.listingId, schema.listings.id)
    )
    .leftJoin(
      schema.industrials,
      eq(schema.industrials.listingId, schema.listings.id)
    )
    .leftJoin(schema.lands, eq(schema.lands.listingId, schema.listings.id))
    .where(eq(schema.listings.id, listingId))
    .limit(1);
  const data = listings[0];
  isActive = validateValue(data.listings.listingType);
  isActive = validateValue(data.listings.propertyType);
  isActive = validateValue(data.listings.tenure);
  isActive = validateValue(data.listings.propertyStatus);
  isActive = validateValue(data.listings.projectName);
  isActive = validateNumber(data.listings.landArea);
  isActive = validateNumber(data.listings.builtUpArea);
  isActive = validateNumber(data.listings.price);
  isActive = validateValue(data.property_addresses?.city || "");
  isActive = validateValue(data.property_addresses?.state || "");
  isActive = validateValue(data.property_addresses?.postalCode || "");
  isActive = validateValue(data.property_addresses?.addressLine1 || "");
  isActive = validateValue(data.clients?.name || "");
  isActive = validateValue(data.clients?.contactNumber || "");
  isActive = validateValue(data.clients?.email || "");

  if (data.listings.propertyType === "residential") {
    isActive = validateValue(data.residentials?.propertySubType || "");
    isActive = validateNumber(data.residentials?.bedrooms.toString() || "");
    isActive = validateNumber(data.residentials?.bathrooms.toString() || "");
    isActive = validateNumber(data.residentials?.carParks.toString() || "");
    isActive = validateValue(data.residentials?.furnishing || "");
  } else if (data.listings.propertyType === "commercial") {
    isActive = validateValue(data.commercials?.propertySubType || "");
    isActive = validateValue(data.commercials?.furnishing || "");
  } else if (data.listings.propertyType === "industrial") {
    isActive = validateValue(data.industrials?.propertySubType || "");
    isActive = validateNumber(data.industrials?.floorLoading || "");
    isActive = validateNumber(data.industrials?.eavesHeight || "");
    isActive = validateNumber(data.industrials?.powerSupply || "");
    isActive = validateValue(data.industrials?.usage || "");
  } else if (data.listings.propertyType === "land") {
    isActive = validateValue(data.lands?.propertySubType || "");
    isActive = validateValue(data.lands?.status || "");
    isActive = validateValue(data.lands?.reserve || "");
  }

  await db
    .update(schema.listings)
    .set({ isActive: isActive })
    .where(eq(schema.listings.id, listingId));
}

export async function getListingsByUserId(userId: string, filter: string) {
  const listings = await db.query.listings.findMany({
    where: (listings, { eq, and, or }) =>
      and(
        eq(listings.userId, userId).if(userId !== ""),
        or(
          sql`${filter} = '' OR listings.id::text ILIKE '%' || ${filter} || '%'`,
          sql`${filter} = '' OR listings.project_name ILIKE '%' || ${filter} || '%'`
        )
      ),
    orderBy: (listings, { desc }) => desc(listings.createdAt),
  });

  return listings;
}

export async function getListingById(id: string, userId: string) {
  const listing = await db
    .select()
    .from(schema.listings)
    .where(and(eq(schema.listings.id, id), eq(schema.listings.userId, userId)))
    .leftJoin(
      schema.propertyAddresses,
      eq(schema.propertyAddresses.listingId, schema.listings.id)
    )
    .leftJoin(schema.clients, eq(schema.clients.listingId, schema.listings.id))
    .leftJoin(
      schema.residentials,
      eq(schema.residentials.listingId, schema.listings.id)
    )
    .leftJoin(
      schema.commercials,
      eq(schema.commercials.listingId, schema.listings.id)
    )
    .leftJoin(
      schema.industrials,
      eq(schema.industrials.listingId, schema.listings.id)
    )
    .leftJoin(schema.lands, eq(schema.lands.listingId, schema.listings.id))
    .limit(1);

  // return listing[0];
  const data: ListingWithJoins = {
    listings: listing[0].listings,
    propertyAddresses: listing[0].property_addresses,
    clients: listing[0].clients,
    residentials: listing[0].residentials,
    commercials: listing[0].commercials,
    industrials: listing[0].industrials,
    lands: listing[0].lands,
  };

  return data;
}

export async function getFilteredListings(filter: MatchListingFormValues) {
  const listing = await db.query.listings.findFirst({
    where: (listings, { eq }) =>
      eq(listings.id, filter.listingId).if(filter.listingId !== ""),
  });
  if (!listing) {
    throw new Error("Listing not found");
  }

  const listings = await db
    .select()
    .from(schema.listings)
    .leftJoin(
      schema.propertyAddresses,
      eq(schema.propertyAddresses.listingId, schema.listings.id)
    )
    .leftJoin(schema.clients, eq(schema.clients.listingId, schema.listings.id))
    .leftJoin(
      schema.residentials,
      eq(schema.residentials.listingId, schema.listings.id)
    )
    .leftJoin(
      schema.commercials,
      eq(schema.commercials.listingId, schema.listings.id)
    )
    .leftJoin(
      schema.industrials,
      eq(schema.industrials.listingId, schema.listings.id)
    )
    .leftJoin(schema.lands, eq(schema.lands.listingId, schema.listings.id))
    .where(
      and(
        sql`${filter.listingType} = '' OR listings.listingType ILIKE '%' || ${filter.listingType} || '%'`,
        sql`${filter.propertyType} = '' OR listings.propertyType ILIKE '%' || ${filter.propertyType} || '%'`,
        ilike(schema.listings.tenure, filter.tenure).if(filter.tenure !== ""),
        ilike(schema.listings.propertyStatus, filter.propertyStatus).if(
          filter.propertyStatus !== ""
        ),
        ilike(schema.listings.projectName, filter.projectName).if(
          filter.projectName !== ""
        ),
        gte(schema.listings.landArea, filter.minLandArea.toFixed(2)).if(
          filter.minLandArea > 0
        ),
        lte(schema.listings.landArea, filter.maxLandArea.toFixed(2)).if(
          filter.maxLandArea > 0
        ),
        gte(schema.listings.builtUpArea, filter.minBuiltUpArea.toFixed(2)).if(
          filter.minBuiltUpArea > 0
        ),
        lte(schema.listings.builtUpArea, filter.maxBuiltUpArea.toFixed(2)).if(
          filter.maxBuiltUpArea > 0
        ),
        gte(schema.listings.price, filter.minPrice.toFixed(2)).if(
          filter.minPrice > 0
        ),
        lte(schema.listings.price, filter.maxPrice.toFixed(2)).if(
          filter.maxPrice > 0
        ),
        ilike(schema.propertyAddresses.city, filter.address.city).if(
          filter.address.city !== ""
        ),
        ilike(schema.propertyAddresses.state, filter.address.state).if(
          filter.address.state !== ""
        ),
        eq(
          schema.residentials.propertySubType,
          filter.residential.propertySubType
        ).if(
          filter.propertyType === "residential" &&
            filter.residential.propertySubType !== ""
        ),
        gte(schema.residentials.bedrooms, filter.residential.minBedrooms).if(
          filter.propertyType === "residential" &&
            filter.residential.minBedrooms > 0 &&
            filter.residential.maxBedrooms !== 11
        ),
        lte(schema.residentials.bedrooms, filter.residential.maxBedrooms).if(
          filter.propertyType === "residential" &&
            filter.residential.maxBedrooms > 0 &&
            filter.residential.maxBedrooms !== 11
        ),
        gte(schema.residentials.bedrooms, 11).if(
          (filter.propertyType === "residential" &&
            filter.residential.maxBedrooms === 11) ||
            filter.residential.minBedrooms === 11
        ),
        gte(schema.residentials.bathrooms, filter.residential.minBathrooms).if(
          filter.propertyType === "residential" &&
            filter.residential.minBathrooms > 0 &&
            filter.residential.maxBathrooms !== 11
        ),
        lte(schema.residentials.bathrooms, filter.residential.maxBathrooms).if(
          filter.propertyType === "residential" &&
            filter.residential.maxBathrooms > 0 &&
            filter.residential.maxBathrooms !== 11
        ),
        gte(schema.residentials.bathrooms, 11).if(
          (filter.propertyType === "residential" &&
            filter.residential.maxBathrooms === 11) ||
            filter.residential.minBathrooms === 11
        ),
        gte(schema.residentials.carParks, filter.residential.minCarParks).if(
          filter.propertyType === "residential" &&
            filter.residential.minCarParks > 0 &&
            filter.residential.maxCarParks !== 11
        ),
        lte(schema.residentials.carParks, filter.residential.maxCarParks).if(
          filter.propertyType === "residential" &&
            filter.residential.maxCarParks > 0 &&
            filter.residential.maxCarParks !== 11
        ),
        gte(schema.residentials.carParks, 11).if(
          (filter.propertyType === "residential" &&
            filter.residential.maxCarParks === 11) ||
            filter.residential.minCarParks === 11
        ),
        ilike(schema.residentials.furnishing, filter.residential.furnishing).if(
          filter.propertyType === "residential" &&
            filter.residential.furnishing !== ""
        ),
        eq(
          schema.commercials.propertySubType,
          filter.commercial.propertySubType
        ).if(
          filter.propertyType === "commercial" &&
            filter.commercial.propertySubType !== ""
        ),
        ilike(schema.commercials.furnishing, filter.commercial.furnishing).if(
          filter.propertyType === "commercial" &&
            filter.commercial.furnishing !== ""
        ),
        eq(
          schema.industrials.propertySubType,
          filter.industrial.propertySubType
        ).if(
          filter.propertyType === "industrial" &&
            filter.industrial.propertySubType !== ""
        ),
        gte(
          schema.industrials.floorLoading,
          filter.industrial.minFloorLoading.toFixed(2)
        ).if(
          filter.propertyType === "industrial" &&
            filter.industrial.minFloorLoading > 0
        ),
        lte(
          schema.industrials.floorLoading,
          filter.industrial.maxFloorLoading.toFixed(2)
        ).if(
          filter.propertyType === "industrial" &&
            filter.industrial.maxFloorLoading > 0
        ),
        gte(
          schema.industrials.eavesHeight,
          filter.industrial.minEavesHeight.toFixed(2)
        ).if(
          filter.propertyType === "industrial" &&
            filter.industrial.minEavesHeight > 0
        ),
        lte(
          schema.industrials.eavesHeight,
          filter.industrial.maxEavesHeight.toFixed(2)
        ).if(
          filter.propertyType === "industrial" &&
            filter.industrial.maxEavesHeight > 0
        ),
        gte(
          schema.industrials.powerSupply,
          filter.industrial.minPowerSupply.toFixed(0)
        ).if(
          filter.propertyType === "industrial" &&
            filter.industrial.minPowerSupply > 0
        ),
        lte(
          schema.industrials.powerSupply,
          filter.industrial.maxPowerSupply.toFixed(0)
        ).if(
          filter.propertyType === "industrial" &&
            filter.industrial.maxPowerSupply > 0
        ),
        eq(schema.industrials.isGasSupply, filter.industrial.isGasSupply).if(
          filter.propertyType === "industrial" &&
            filter.industrial.isGasSupply !== false
        ),
        ilike(schema.industrials.usage, filter.industrial.usage).if(
          filter.propertyType === "industrial" && filter.industrial.usage !== ""
        ),
        eq(schema.lands.propertySubType, filter.land.propertySubType).if(
          filter.propertyType === "land" && filter.land.propertySubType !== ""
        ),
        ilike(schema.lands.status, filter.land.status).if(
          filter.propertyType === "land" && filter.land.status !== ""
        ),
        ilike(schema.lands.reserve, filter.land.reserve).if(
          filter.propertyType === "land" && filter.land.reserve !== ""
        )
      )
    );

  return listings;
}
