import type db from "@/db";
import * as schema from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

type InsertCommercial = InferInsertModel<typeof schema.commercials>;

export default async function seed(db: db) {
  const listings = await db.query.listings.findMany({
    where: (listings, { eq }) => eq(listings.propertyType, "commercial"),
  });
  const listingIds = listings.map((listing) => listing.id);
  const commercials = generateMockCommercials(listingIds);
  await db.insert(schema.commercials).values(commercials);
}

function generateMockCommercials(listingIds: string[]): InsertCommercial[] {
  const commercials: InsertCommercial[] = [];
  for (const listingId of listingIds) {
    const commercial: InsertCommercial = {
      listingId: listingId,
      propertySubType: randomValue([
        "office",
        "retail",
        "industrial",
        "land",
      ]) as any,
      furnishing: randomValue(["fully", "partially", "unfurnished"]) as any,
    };
    commercials.push(commercial);
  }
  return commercials;
}

function randomValue(values: string[]): string {
  return values[Math.floor(Math.random() * values.length)];
}
