import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const GlobalSearchBar = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient light-border-2 relative flex min-h-[56px] grow items-center gap-1 rounded-xl border px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />

        <Input
          type="text"
          placeholder="Search Globally"
          className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
        />
      </div>
    </div>
  );
};

export default GlobalSearchBar;
