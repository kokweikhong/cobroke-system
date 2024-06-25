import { SelectClient } from "@/types/listings";

export function generateMockClients(listingIds: string[]): SelectClient[] {
  const clients: SelectClient[] = [];
  for (const listingId of listingIds) {
    const client: SelectClient = {
      id: Math.floor(Math.random() * 100000),
      listingId: listingId,
      name: "Client " + Math.random() * 1000,
      contactNumber: "60167778888",
      email: "client" + Math.random() * 1000 + "@cobroke.com",
    };
    clients.push(client);
  }
  return clients;
}
