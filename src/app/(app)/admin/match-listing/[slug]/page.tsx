import { getAuthSession } from "@/actions/session";
import ListingForm from "./_components/listing-form";
import { getListingById } from "@/actions/listings";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getAuthSession();
  console.log(params.slug, session?.userId);
  const listing = await getListingById(params.slug, session?.userId || "");
  // const listing = {};
  console.log(listing);

  return (
    <div>
      <h1>Match Listing: {params.slug}</h1>
      <div>
        <ListingForm
          data={listing}
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
