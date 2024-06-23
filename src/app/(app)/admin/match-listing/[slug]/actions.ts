"use server";

import db from "@/db";
import * as schema from "@/db/schema";

export async function getListingById(id: string) {
  const listing = await db.query.listings.findFirst({
    where: (listing, { eq }) => eq(listing.id, id),
    with: {
      user: true,
      propertyAddresses: true,
      clients: true,
      residentials: true,
      commercials: true,
      industrials: true,
      lands: true,
    },
  });

  return listing;
}
