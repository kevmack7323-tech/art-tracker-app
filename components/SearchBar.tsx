"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) {
      params.set("q", query.trim());
    }
    router.push(params.toString() ? `/?${params.toString()}` : "/");
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-2 sm:flex-row" role="search">
      <label htmlFor="artwork-search" className="sr-only">
        Search artworks, artists, or museums
      </label>
      <input
        id="artwork-search"
        name="q"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search artworks, artists, or cities"
        className="w-full rounded-md border border-gallery-line bg-gallery-paper px-4 py-3 text-base text-gallery-ink"
        autoComplete="off"
      />
      <button
        type="submit"
        className="rounded-md bg-gallery-burgundy px-5 py-3 font-medium text-white hover:bg-[#641823]"
      >
        Search
      </button>
    </form>
  );
}
