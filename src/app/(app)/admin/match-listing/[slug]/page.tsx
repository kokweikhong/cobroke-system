import { getAuthSession } from "@/actions/session";
import MatchListingForm from "./_components/MatchListingForm";

export default function Page({ params }: { params: { slug: string } }) {
  const session = getAuthSession();

  return (
    <div>
      <h1>Match Listing: {params.slug}</h1>
      <div>
        <MatchListingForm
          listing={
            {
              listingType: "wts",
              propertyType: "residential",
              tenure: "adds",
              landArea: "1000.25",
            } as any
          }
        />
      </div>
    </div>
  );
}
