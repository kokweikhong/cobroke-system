import ListingForm from "./_components/ListingForm";

export default function Page({ params }: { params: { slug: string } }) {
  const listingId = params.slug;
  return (
    <div>
      <h1>Page</h1>
      <div>{/* <Link href="/admin/users/create">Create</Link> */}</div>
      <div>
        <ListingForm />
      </div>
    </div>
  );
}
