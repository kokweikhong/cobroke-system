"use server";

import db from "@/db";
import * as schema from "@/db/schema";
import { and, eq, gte, ilike, lte, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuthSession } from "./session";
import { ListingWithJoins, MatchListingFormValues } from "@/types/listings";
import { getMinMaxValuesByPercentage } from "@/lib/utils";

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
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function getListingsByUserId(filter: string) {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = session.userId;
  // const filter = formData.get("filter") as string;
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

// export async function getFilteredListings(filter: MatchListingFormValues) {
//   const listing = await db.query.listings.findFirst({
//     where: (listings, { eq, and }) =>
//       eq(listings.id, filter.listingId).if(filter.listingId !== ""),
//   });
//   if (!listing) {
//     throw new Error("Listing not found");
//   }
//   const landAreas = getMinMaxValuesByPercentage(
//     listing.landArea,
//     filter.landArea,
//     2
//   );
//   const builtUpAreas = getMinMaxValuesByPercentage(
//     listing.builtUpArea,
//     filter.builtUpArea,
//     2
//   );
//   const prices = getMinMaxValuesByPercentage(listing.price, filter.price, 2);
//   const listings = await db
//     .select()
//     .from(schema.listings)
//     .leftJoin(
//       schema.propertyAddresses,
//       eq(schema.propertyAddresses.listingId, schema.listings.id)
//     )
//     .where(
//       and(
//         sql`${filter.listingType} = '' OR listings.listingType ILIKE '%' || ${filter.listingType} || '%'`,
//         sql`${filter.propertyType} = '' OR listings.propertyType ILIKE '%' || ${filter.propertyType} || '%'`,
//         ilike(schema.listings.tenure, filter.tenure).if(filter.tenure !== ""),
//         ilike(schema.listings.propertyStatus, filter.propertyStatus).if(
//           filter.propertyStatus !== ""
//         ),
//         ilike(schema.listings.projectName, filter.projectName).if(
//           filter.projectName !== ""
//         ),
//         gte(schema.listings.landArea, landAreas[0].toFixed(2)).if(
//           filter.landArea !== "" && filter.landArea !== "0"
//         ),
//         lte(schema.listings.landArea, landAreas[1].toFixed(2)).if(
//           filter.landArea !== "" && filter.landArea !== "0"
//         ),
//         gte(schema.listings.builtUpArea, builtUpAreas[0].toFixed(2)).if(
//           filter.builtUpArea !== "" && filter.builtUpArea !== "0"
//         ),
//         lte(schema.listings.builtUpArea, builtUpAreas[1].toFixed(2)).if(
//           filter.builtUpArea !== "" && filter.builtUpArea !== "0"
//         ),
//         gte(schema.listings.price, prices[0].toFixed(2)).if(
//           filter.price !== "" && filter.price !== "0"
//         ),
//         lte(schema.listings.price, prices[1].toFixed(2)).if(
//           filter.price !== "" && filter.price !== "0"
//         ),
//         ilike(schema.propertyAddresses.city, filter.city).if(
//           filter.city !== ""
//         ),
//         ilike(schema.propertyAddresses.state, filter.state).if(
//           filter.state !== ""
//         )
//       )
//     );

//   return listings;
// }
