"use server";

import db from "@/db";
import * as schema from "@/db/schema";
import { InferSelectModel, desc, sql } from "drizzle-orm";
import { getAuthSession } from "@/actions/session";

type SelectListing = InferSelectModel<typeof schema.listings>;

export type GetListingsProps = {
  listingId: string;
  projectName: string;
};

export async function getListings(filter: string) {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = session.userId;
  // const filter = formData.get("filter") as string;
  const listings = await db.query.listings.findMany({
    where: (listings, { eq, and, like, or, ilike }) =>
      and(
        eq(listings.userId, userId).if(userId !== ""),
        or(
          sql`${filter} = '' OR listings.id::text ILIKE '%' || ${filter} || '%'`,
          sql`${filter} = '' OR listings.project_name ILIKE '%' || ${filter} || '%'`
        )
      ),
    orderBy: (listings, { desc }) => desc(listings.createdAt),
  });

  return listings;
}
