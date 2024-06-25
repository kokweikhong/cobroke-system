// import ListingForm from "./_components/listing-form";
import UpdateListingForm from "./_components/update-listing-form";

export default function Page({ params }: { params: { slug: string } }) {
  const listingId = params.slug;
  return (
    <div>
      <h1>Page</h1>
      <div>{/* <Link href="/admin/users/create">Create</Link> */}</div>
      <div>
        <UpdateListingForm data={{} as any} />
      </div>
      <div>{/* <ListingForm /> */}</div>
    </div>
  );
}
