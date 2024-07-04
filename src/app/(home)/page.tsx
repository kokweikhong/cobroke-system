import db from "@/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateMockLisitngs } from "@/mocks/listings";
import { getReadableListingType } from "@/lib/listing-type";

export default async function Page() {
  const listings = await db.query.listings.findMany();
  // let listings = generateMockLisitngs("1");
  if (!listings) {
    return <div>No listings found</div>;
  }

  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="flex flex-col items-start space-y-2 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
          >
            <p className="truncate">
              {getReadableListingType(listing.listingType)}
            </p>
            {/* <span className="absolute inset-0" aria-hidden="true" /> */}
            <p className="truncate text-sm font-medium text-gray-900 capitalize">
              {listing.projectName}
            </p>
            <p className="truncate text-sm text-gray-500 capitalize">
              {listing.propertyType}
            </p>
            <p className="truncate text-sm text-gray-500">{`RM ${parseFloat(
              listing.price,
            ).toLocaleString()}`}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
