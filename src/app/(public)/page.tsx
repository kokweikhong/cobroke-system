import db from "@/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Page() {
  const listings = await db.query.listings.findMany();

  if (!listings) {
    return <div>No listings found</div>;
  }

  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-2 gap-4 p-4">
        {listings.map((listing) => (
          <Card key={listing.id}>
            <CardHeader>
              <CardTitle>{listing.projectName}</CardTitle>
              <CardDescription className="capitalize">
                {listing.propertyType}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {listing.listingType === "wts" ? (
                <p>Want to Sell</p>
              ) : listing.listingType === "wtb" ? (
                <p>Want to Buy</p>
              ) : listing.listingType === "wtl" ? (
                <p>Want to Lease</p>
              ) : listing.listingType === "wtr" ? (
                <p>Want to Rent</p>
              ) : (
                <p>Listing Type</p>
              )}
            </CardContent>
            <CardFooter>{`RM ${parseFloat(
              listing.price
            ).toLocaleString()}`}</CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
