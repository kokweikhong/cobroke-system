"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import * as schema from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { useEffect, useState } from "react";
import { getListingsByUserId } from "@/actions/listings";
import FilterInput from "./_components/filter-input";
import Link from "next/link";
import ListingTable from "./_components/listing-table";

type SelectListing = InferSelectModel<typeof schema.listings>;

export default function Page() {
  const [filter, setFilter] = useState<string>("");
  const [listings, setListings] = useState<SelectListing[]>([]);

  async function fetchListings() {
    const listings = await getListingsByUserId(filter);
    console.log(listings);
    setListings(listings);
  }

  useEffect(() => {
    fetchListings();
    console.log(listings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <FilterInput fetchListings={fetchListings} setFilter={setFilter} />
      <Accordion type="single" collapsible>
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
          <AccordionContent className="p-4 h-96">
            <div className="">
              <ListingTable
                data={listings.filter((e) => e.propertyType === "residential")}
              />
            </div>
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
          <AccordionContent className="p-4">
            <div className="max-h-96">
              <ListingTable
                data={listings.filter((e) => e.propertyType === "commercial")}
              />
            </div>
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
          <AccordionContent className="p-4">
            <div className="max-h-96">
              <ListingTable
                data={listings.filter((e) => e.propertyType === "industrial")}
              />
            </div>
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
          <AccordionContent className="p-4">
            <div>
              <ListingTable
                data={listings.filter((e) => e.propertyType === "land")}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
