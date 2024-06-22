import type db from "@/db";
import * as schema from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

type InsertLands = InferInsertModel<typeof schema.lands>;

export default async function seed(db: db) {
  const listings = await db.query.listings.findMany({
    where: (listings, { eq }) => eq(listings.propertyType, "land"),
  });
  const listingIds = listings.map((listing) => listing.id);
  const lands = generateMockLands(listingIds);
  await db.insert(schema.lands).values(lands);
}

function generateMockLands(listingIds: string[]): InsertLands[] {
  const lands: InsertLands[] = [];
  for (const listingId of listingIds) {
    const land: InsertLands = {
      listingId: listingId,
      propertySubType: randomValue([
        "agricultural",
        "commercial",
        "industrial",
        "residential",
      ]) as any,
      status: randomValue(["for sale", "for rent"]) as any,
      reserve: randomValue(["bumi", "non-bumi"]) as any,
    };
    lands.push(land);
  }
  return lands;
}

function randomValue(values: string[]): string {
  return values[Math.floor(Math.random() * values.length)];
}
