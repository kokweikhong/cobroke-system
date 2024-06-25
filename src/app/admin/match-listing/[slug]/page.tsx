import { getAuthSession } from "@/actions/session";
import { getListingById } from "@/actions/listings";
import { generateMockListingsWithJoin } from "@/mocks/listings";
import MatchingForm from "./_components/matching.form";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getAuthSession();
  console.log(params.slug, session?.userId);
  // const listing = await getListingById(params.slug, session?.userId || "");
  // const listing = {};
  const listings = generateMockListingsWithJoin("1");
  const listing = listings.find((l) => l.listings.propertyType === "land");
  console.log(listing);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold tracking-wide text-gray-800">
          Match Listing Form
        </h1>
      </div>
      <div>
        <MatchingForm data={listing && (listing as any)} />
      </div>
    </div>
  );
}
