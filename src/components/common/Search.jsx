"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  // State to manage loading spinner visibility
  const [loading, setLoading] = useState(false);

  // State for the current input value of the search query
  const [query, setQuery] = useState("");

  // State for the debounced value of the search query, used to reduce the number of API calls
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Hooks to access the router, current path, and search parameters in the URL
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Effect to implement debouncing: waits for the user to stop typing for 1 second before setting the debouncedQuery
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => clearTimeout(timer);
  }, [query]);

  // Effect to handle navigation when the debouncedQuery or the actual query changes
  useEffect(() => {
    if (debouncedQuery) {
      router.push(`/search?query=${debouncedQuery}`);

      // Resets debouncedQuery and loading state after navigation
      setDebouncedQuery("");
      setLoading(false);
    }
    if (!query && pathname.includes("/search")) {
      // Navigates back to the home page if the query is cleared
      router.push(`/search`);
      setLoading(false);
    }
  }, [debouncedQuery, pathname, query, router]);

  // Effect to synchronize the input field with the URL's search query parameter when the component mounts
  useEffect(() => {
    if (!!searchParams.get("query")) {
      // Sets the query state to the current value of the "query" URL parameter
      setQuery(searchParams.get("query"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handler function for input changes, updates query state and shows loading spinner
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setLoading(true);
  };

  return (
    <div className="relative">
      {/* Input field for search query */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="w-[300px] lg:w-[400px] xl:w-[500px] 2xl:w-[600px] border h-12 shadow py-1 px-6 rounded-full text-gray-900 outline-none focus:border-primary dark:bg-zinc-900 dark:text-white"
        placeholder="Search Blogs..."
      />
      {/* Loading spinner, shown when loading state is true */}
      {loading && (
        <span className="absolute top-3 right-5 text-white">
          <Image
            src="/images/Spinner.svg"
            width={20}
            height={20}
            alt="Loading"
            property=""
          />
        </span>
      )}
    </div>
  );
};

export default Search;
