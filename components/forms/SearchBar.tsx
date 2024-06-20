"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "../ui/input";

interface Props {
  routeType: string;
}

function SearchBar({ routeType }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${routeType}?q=` + search);
      } else {
        router.push(`/${routeType}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);

  return (
    <div className='flex flex-row gap-3 rounded-lg bg-primary-500 px-1 py-1 pl-3'>
      <Image
        src='/assets/search.svg'
        alt='search'
        width={24}
        height={24}
      />
      <Input
        id='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Users"
        className='no-focus border-none text-base-regular outline-none'
      />
    </div>
  );
}

export default SearchBar;