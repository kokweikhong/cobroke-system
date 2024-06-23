"use server";

import db from "@/db";
import * as schema from "@/db/schema";
import { InferSelectModel, desc } from "drizzle-orm";
import { getAuthSession } from "@/actions/session";

type SelectListing = InferSelectModel<typeof schema.listings>;

export type GetListingsProps = {
  listingId: string;
  projectName: string;
};

export async function getListings(formData: FormData) {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = session.userId;
  const filter = formData.get("filter") as string;
  const listings = await db.query.listings.findMany({
    where: (listings, { eq, and, like, or }) =>
      and(
        eq(listings.userId, userId).if(userId !== ""),
        or(
          like(listings.id, filter).if(filter !== ""),
          like(listings.projectName, filter).if(filter !== "")
        )
      ),
    orderBy: (listings, { desc }) => desc(listings.createdAt),
  });

  return listings;
}
