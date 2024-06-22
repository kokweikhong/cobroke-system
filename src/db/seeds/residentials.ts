import type db from "@/db";
import * as schema from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

type InsertResidential = InferInsertModel<typeof schema.residentials>;

export default async function seed(db: db) {
  const listings = await db.query.listings.findMany({
    where: (listings, { eq }) => eq(listings.propertyType, "residential"),
  });
  const listingIds = listings.map((listing) => listing.id);
  const clients = generateMockResidentials(listingIds);
  await db.insert(schema.residentials).values(clients);
}

function generateMockResidentials(listingIds: string[]): InsertResidential[] {
  const residentials: InsertResidential[] = [];
  for (const listingId of listingIds) {
    const residential: InsertResidential = {
      listingId: listingId,
      propertySubType: randomValue([
        "apartment",
        "condominium",
        "bungalow",
        "semi-detached",
        "terrace",
        "townhouse",
        "villa",
      ]) as any,
      bedrooms: Math.floor(Math.random() * 10),
      bathrooms: Math.floor(Math.random() * 10),
      carParks: Math.floor(Math.random() * 10),
      furnishing: randomValue(["fully", "partially", "unfurnished"]) as any,
    };
    residentials.push(residential);
  }
  return residentials;
}

function randomValue(values: string[]): string {
  return values[Math.floor(Math.random() * values.length)];
}
