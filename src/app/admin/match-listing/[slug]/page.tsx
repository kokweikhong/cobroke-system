import { getAuthSession } from "@/actions/session";
import { getListingById } from "@/actions/listings";
import { generateMockListingsWithJoin } from "@/mocks/listings";
import MatchingTabs from "./_components/matching-tabs";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getAuthSession();
  if (!session || !session.isLogged) {
    throw new Error("Not authorized");
  }
  console.log(params.slug, session?.userId);
  const listing = await getListingById(params.slug, session.userId);
  // const listing = {};
  // const listings = generateMockListingsWithJoin("1");
  // const listing = listings.find((l) => l.listings.propertyType === "land");
  // console.log(listing);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold tracking-wide text-gray-800">
          Match Listing Form
        </h1>
      </div>
      <div>
        <MatchingTabs data={listing} />
      </div>
    </div>
  );
}
