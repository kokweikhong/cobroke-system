import UpdateListingForm from "./_components/update-listing-form";

export default function Page({ params }: { params: { slug: string } }) {
  const listingId = params.slug;
  // TODO: Fetch listing by ID
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Update Listing</h1>
      </div>
      <div>
        <UpdateListingForm data={{} as any} listingId={listingId} />
      </div>
    </div>
  );
}
