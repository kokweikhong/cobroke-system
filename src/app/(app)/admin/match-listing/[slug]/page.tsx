import { getAuthSession } from "@/actions/session";
import MatchListingForm from "./_components/MatchListingForm";
import { getListingById } from "./actions";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getAuthSession();
  const listing = await getListingById(params.slug, session?.userId || "");

  return (
    <div>
      <h1>Match Listing: {params.slug}</h1>
      <div>
        <MatchListingForm
          listing={listing as any}
          // listing={
          //   {
          //     listingType: "wts",
          //     propertyType: "residential",
          //     tenure: "adds",
          //     landArea: "1000.25",
          //   } as any
          // }
        />
      </div>
    </div>
  );
}
