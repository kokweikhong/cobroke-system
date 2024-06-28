import { getListingById } from "@/actions/listings";
import UpdateListingForm from "./_components/update-listing-form";
import { getAuthSession } from "@/actions/session";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getAuthSession();
  if (!session || !session.isLogged) {
    throw new Error("Not authorized");
  }
  const listingId = params.slug;
  const data = await getListingById(listingId, session.userId);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Update Listing</h1>
      </div>
      <div>
        <UpdateListingForm data={data} listingId={listingId} />
      </div>
    </div>
  );
}
