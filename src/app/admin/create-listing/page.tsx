import { getAuthSession } from "@/actions/session";
import CreateListingForm from "./_components/create-listing-form";

export default async function Page() {
  const session = await getAuthSession();

  if (!session || !session.isLogged) {
    throw new Error("Not authorized");
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Listing</h1>
      </div>
      <CreateListingForm userId={session.userId} />
    </div>
  );
}
