import { SelectListing, ListingWithJoins } from "@/types/listings";
import { generateMockClients } from "./clients";
import { generateMockAddresses } from "./addresses";
import { generateMockResidentials } from "./residentials";
import { generateMockCommercials } from "./commercials";
import { generateMockIndustrials } from "./industrials";
import { generateMockLands } from "./lands";

export function generateMockListingsWithJoin(
  userId: string
): ListingWithJoins[] {
  const listings = generateMockLisitngs(userId);
  const listingIds = listings.map((listing) => listing.id);
  const clients = generateMockClients(listingIds);
  const addresses = generateMockAddresses(listingIds);
  const data: ListingWithJoins[] = [];
  for (const listing of listings) {
    const client = clients.find((client) => client.listingId === listing.id);
    const address = addresses.find(
      (address) => address.listingId === listing.id
    );
    data.push({
      listings: listing,
      clients: client || null,
      propertyAddresses: address || null,
      users: {
        id: userId,
        email: "admin@cobrokesystem.com",
        firstName: "Admin",
        lastName: "User",
        contactNumber: "0123456789",
        role: "admin",
        isActive: true,
        isApproved: true,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: "cobroke",
      },
      residentials:
        listing.propertyType === "residential"
          ? generateMockResidentials([listing.id])[0]
          : null,
      commercials:
        listing.propertyType === "commercial"
          ? generateMockCommercials([listing.id])[0]
          : null,
      industrials:
        listing.propertyType === "industrial"
          ? generateMockIndustrials([listing.id])[0]
          : null,
      lands:
        listing.propertyType === "land"
          ? generateMockLands([listing.id])[0]
          : null,
    });
  }
  return data;
}

export function generateMockLisitngs(userId: string): SelectListing[] {
  const listings: SelectListing[] = [];
  for (let i = 0; i < 1000; i++) {
    const listing: SelectListing = {
      id: i.toString(),
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
      currentRental: (Math.random() * 10000).toFixed(2),
      isActive: true,
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    listings.push(listing);
  }
  return listings;
}

function randomValue(values: string[]): string {
  return values[Math.floor(Math.random() * values.length)];
}
