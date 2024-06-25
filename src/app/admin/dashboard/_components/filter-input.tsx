"use client";

import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const FilterInput = () => {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("");

  return (
    <div>
      <label htmlFor="filter" className="sr-only">
        Filter
      </label>
      <div className="relative mt-1 mb-8">
        <input
          id="filter"
          name="filter"
          type="search"
          className="w-full h-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none transition-colors"
          placeholder="Search Project Name / Listing ID"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
        <button
          // href={`/admin/dashboard?q=${filter}`}
          type="button"
          // variant={"outline"}
          className="block text-center text-xl leading-0 absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 focus:outline-none transition-colors"
          onClick={() => {
            setFilter("");
            router.push(`/admin/dashboard?q=${filter}`);
          }}
        >
          <SearchIcon size={20} />
        </button>
      </div>
    </div>
  );
};

export default FilterInput;
