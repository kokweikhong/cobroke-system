"use server";

import db from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
