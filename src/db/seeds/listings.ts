import type db from "@/db";
import * as schema from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

type InsertListing = InferInsertModel<typeof schema.listings>;

export default async function seed(db: db) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.role, "superadmin"),
  });
  if (!user) {
    return;
  }
  const listings = generateMockLisitngs(user.id);
  await db.insert(schema.listings).values(listings);
}

function generateMockLisitngs(userId: string): InsertListing[] {
  const listings: InsertListing[] = [];
  for (let i = 0; i < 1000; i++) {
    const listing: InsertListing = {
      userId: userId,
      listingCategory: "public",
      listingType: randomValue(["wts", "wtb", "wtl", "wtr"]) as any,
      propertyType: randomValue([
        "residential",
        "commercial",
        "industrial",
        "land",
      ]) as any,
      projectName: "Project " + i,
      tenure: "Tenure " + i,
      propertyStatus: "Property Status " + i,
      builtUpArea: (Math.random() * 1000).toFixed(2),
      landArea: (Math.random() * 10000).toFixed(2),
      price: (Math.random() * 1000000).toFixed(2),
      description: "Description " + i,
    };
    listings.push(listing);
  }
  return listings;
}

function randomValue(values: string[]): string {
  return values[Math.floor(Math.random() * values.length)];
}
