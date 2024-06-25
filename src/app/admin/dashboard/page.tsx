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

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = searchParams.q || "";
  console.log(query);
  // const session = await getAuthSession();
  // if (!session) {
  //   return <div>Unauthorized</div>;
  // }
  // const userId = session.userId || "1";
  // const listings = await getListingsByUserId(userId, query);
  const listings = generateMockLisitngs("1");

  return (
    <div>
      <FilterInput />
      <Accordion className="space-y-2" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger
            className={cn(
              "p-4 text-white rounded-xl",
              "[&[data-state=open]]:bg-primary",
              "[&[data-state=closed]]:bg-black"
            )}
          >
            Residential
          </AccordionTrigger>
          <AccordionContent className="py-4">
            <ListingTable
              data={listings.filter((e) => e.propertyType === "residential")}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger
            className={cn(
              "p-4 text-white rounded-xl",
              "[&[data-state=open]]:bg-primary",
              "[&[data-state=closed]]:bg-black"
            )}
          >
            Commercial
          </AccordionTrigger>
          <AccordionContent className="py-4">
            <ListingTable
              data={listings.filter((e) => e.propertyType === "commercial")}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger
            className={cn(
              "p-4 text-white rounded-xl",
              "[&[data-state=open]]:bg-primary",
              "[&[data-state=closed]]:bg-black"
            )}
          >
            Industrial
          </AccordionTrigger>
          <AccordionContent className="py-4">
            <ListingTable
              data={listings.filter((e) => e.propertyType === "industrial")}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger
            className={cn(
              "p-4 text-white rounded-xl",
              "[&[data-state=open]]:bg-primary",
              "[&[data-state=closed]]:bg-black"
            )}
          >
            Land
          </AccordionTrigger>
          <AccordionContent className="py-4">
            <ListingTable
              data={listings.filter((e) => e.propertyType === "land")}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
