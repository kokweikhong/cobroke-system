import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { getListingsByUserId } from "@/actions/listings";
import FilterInput from "./_components/filter-input";
import Link from "next/link";
import ListingTable from "./_components/listing-table";
import { generateMockLisitngs } from "@/mocks/listings";
import { getAuthSession } from "@/actions/session";
import ListingAccordion from "./_components/listing-accordion";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = searchParams.q || "";
  const session = await getAuthSession();
  if (!session || !session.isLogged) {
    throw new Error("Not authorized");
  }
  const userId = session.userId;
  const listings = await getListingsByUserId(userId, query);
  // const listings = generateMockLisitngs("1");

  return (
    <div>
      <FilterInput />
      <div className="flex justify-end p-4">
        <span className="text-sm">
          Showing {listings.length.toLocaleString()} results
        </span>
      </div>
      <ListingAccordion listings={listings} />
    </div>
  );
}
