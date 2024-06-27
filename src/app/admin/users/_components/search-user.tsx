"use client";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchUser = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  return (
    <div>
      <div className="flex items-center gap-4 w-full">
        <input
          type="text"
          placeholder="Search user"
          className="border border-gray-200 rounded-md p-2 w-auto flex-1 min-w-[100px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 flex items-center space-x-2 justify-center"
          onClick={() => router.push(`/admin/users?q=${search}`)}
        >
          <span className="hidden md:block">Search</span>
          <SearchIcon size={16} />
        </button>
      </div>
    </div>
  );
};

export default SearchUser;
