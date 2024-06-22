import type db from "@/db";
import * as schema from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

type InsertIndustrial = InferInsertModel<typeof schema.industrials>;

export default async function seed(db: db) {
  const listings = await db.query.listings.findMany({
    where: (listings, { eq }) => eq(listings.propertyType, "industrial"),
  });
  const listingIds = listings.map((listing) => listing.id);
  const industrials = generateMockIndustrials(listingIds);
  await db.insert(schema.industrials).values(industrials);
}

function generateMockIndustrials(listingIds: string[]): InsertIndustrial[] {
  const industrials: InsertIndustrial[] = [];
  for (const listingId of listingIds) {
    const industrial: InsertIndustrial = {
      listingId: listingId,
      propertySubType: randomValue(["warehouse", "factory", "land"]) as any,
      floorLoading: (Math.random() * 100).toFixed(2),
      eavesHeight: (Math.random() * 100).toFixed(2),
      powerSupply: (Math.random() * 1000).toFixed(2),
      isGasSupply: Math.random() > 0.5,
      usage: randomValue([
        "manufacturing",
        "storage",
        "logistics",
        "others",
      ]) as any,
    };
    industrials.push(industrial);
  }
  return industrials;
}

function randomValue(values: string[]): string {
  return values[Math.floor(Math.random() * values.length)];
}
