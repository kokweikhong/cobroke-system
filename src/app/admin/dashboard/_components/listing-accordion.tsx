"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ListingTable from "./listing-table";
import { cn } from "@/lib/utils";
import { SelectListing } from "@/types/listings";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";

type ListingAccordionProps = {
  listings: SelectListing[];
};

const ListingAccordion: FC<ListingAccordionProps> = ({ listings }) => {
  const [selected, setSelected] = useState<string[]>([]);

  function handleSelected(value: string) {
    if (value === "all") {
      if (selected.length > 0) {
        setSelected([]);
      } else {
        setSelected(["item-1", "item-2", "item-3", "item-4"]);
      }
      return;
    }
    if (selected.includes(value)) {
      setSelected(selected.filter((e) => e !== value));
    } else {
      setSelected([...selected, value]);
    }
  }
  return (
    <div>
      <div className="flex justify-end p-4">
        <Button
          onClick={() => handleSelected("all")}
          className={cn(
            "py-2 px-4 text-white rounded-xl tracking-wider",
            selected.length === 4 ? "bg-black" : "bg-primary",
          )}
        >
          {selected.length === 4 ? "Deselect All" : "Select All"}
        </Button>
      </div>
      <Accordion className="space-y-2" type="multiple" value={selected}>
        <AccordionItem value="item-1">
          <AccordionTrigger
            onClick={() => handleSelected("item-1")}
            className={cn(
              "p-4 text-white rounded-xl",
              "[&[data-state=open]]:bg-primary",
              "[&[data-state=closed]]:bg-black",
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
            onClick={() => handleSelected("item-2")}
            className={cn(
              "p-4 text-white rounded-xl",
              "[&[data-state=open]]:bg-primary",
              "[&[data-state=closed]]:bg-black",
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
            onClick={() => handleSelected("item-3")}
            className={cn(
              "p-4 text-white rounded-xl",
              "[&[data-state=open]]:bg-primary",
              "[&[data-state=closed]]:bg-black",
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
            onClick={() => handleSelected("item-4")}
            className={cn(
              "p-4 text-white rounded-xl",
              "[&[data-state=open]]:bg-primary",
              "[&[data-state=closed]]:bg-black",
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
};

export default ListingAccordion;
