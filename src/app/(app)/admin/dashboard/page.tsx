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
import { GetListingsProps } from "./actions";
import { getListings } from "./actions";
import { SearchIcon } from "lucide-react";
import FilterInput from "./_components/FilterInput";

type SelectListing = InferSelectModel<typeof schema.listings>;

export default function Page() {
  const [listings, setListings] = useState<SelectListing[]>([]);

  async function fetchListings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("filter"));
    const listings = await getListings(formData);
    setListings(listings);
  }

  return (
    <div>
      <FilterInput fetchListings={fetchListings} />
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
          <AccordionContent className="p-4"></AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
