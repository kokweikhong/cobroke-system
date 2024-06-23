"use client";

import { SearchIcon } from "lucide-react";
import { FC } from "react";

type FilterInputProps = {
  fetchListings: (event: React.FormEvent<HTMLFormElement>) => void;
};

const FilterInput: FC<FilterInputProps> = ({ fetchListings }) => {
  return (
    <div>
      <form onSubmit={fetchListings}>
        <label htmlFor="filter" className="sr-only">
          Filter
        </label>
        <div className="relative mt-1 mb-8">
          <input
            id="filter"
            name="filter"
            defaultValue={""}
            type="search"
            className="w-full h-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none transition-colors"
            placeholder="Search Project Name / Listing ID"
          />
          <button
            type="submit"
            className="block text-center text-xl leading-0 absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 focus:outline-none transition-colors"
          >
            <SearchIcon size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterInput;
