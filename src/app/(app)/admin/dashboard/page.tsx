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
import { getListings } from "./actions";
import FilterInput from "./_components/FilterInput";
import Link from "next/link";

type SelectListing = InferSelectModel<typeof schema.listings>;

export default function Page() {
  const [filter, setFilter] = useState<string>("");
  const [listings, setListings] = useState<SelectListing[]>([]);

  async function fetchListings() {
    const listings = await getListings(filter);
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
          <AccordionContent className="p-4">
            {listings.map((listing) => (
              <div key={listing.id}>
                <Link href={`/admin/match-listing/${listing.id}`}>
                  {listing.projectName}
                </Link>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
