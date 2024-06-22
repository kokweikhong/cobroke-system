import type db from "@/db";
import * as schema from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

type InsertPropertyAddress = InferInsertModel<typeof schema.propertyAddresses>;

export default async function seed(db: db) {
  const listings = await db.query.listings.findMany();
  const listingIds = listings.map((listing) => listing.id);
  const addresses = generateMockAddresses(listingIds);
  await db.insert(schema.propertyAddresses).values(addresses);
}

function generateMockAddresses(listingIds: string[]): InsertPropertyAddress[] {
  const addresses: InsertPropertyAddress[] = [];
  for (const listingId of listingIds) {
    const address: InsertPropertyAddress = {
      listingId: listingId,
      addressLine1: "Address Line 1 " + Math.random() * 1000,
      addressLine2: "Address Line 2 " + Math.random() * 1000,
      city: "City " + Math.random() * 10,
      state: randomState(),
      postalCode: Math.floor(Math.random() * 100000).toString(),
    };
    addresses.push(address);
  }
  return addresses;
}

function randomState(): string {
  const states = [
    "Johor",
    "Kedah",
    "Kelantan",
    "Kuala Lumpur",
    "Labuan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Perak",
    "Perlis",
    "Pulau Pinang",
    "Putrajaya",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
  ];
  return states[Math.floor(Math.random() * states.length)];
}
