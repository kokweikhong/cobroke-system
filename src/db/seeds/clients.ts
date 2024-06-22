import type db from "@/db";
import * as schema from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

type InsertClient = InferInsertModel<typeof schema.clients>;

export default async function seed(db: db) {
  const listings = await db.query.listings.findMany();
  const listingIds = listings.map((listing) => listing.id);
  const clients = generateMockClients(listingIds);
  await db.insert(schema.clients).values(clients);
}

function generateMockClients(listingIds: string[]): InsertClient[] {
  const clients: InsertClient[] = [];
  for (const listingId of listingIds) {
    const client: InsertClient = {
      listingId: listingId,
      name: "Client " + Math.random() * 1000,
      contactNumber: "60167778888",
      email: "client" + Math.random() * 1000 + "@cobroke.com",
    };
    clients.push(client);
  }
  return clients;
}
