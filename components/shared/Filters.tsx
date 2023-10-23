"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FilterType } from "@/types";
import { SelectGroup } from "@radix-ui/react-select";

import React, { useState } from "react";

type Props = {
  filters: FilterType[];
  otherClasses?: string;
  containerClasses?: string;
};

const Filters = ({ filters, containerClasses, otherClasses }: Props) => {
  const [activeFilter, setActiveFilter] = useState("");
  return (
    <section className={`flex ${containerClasses}`}>
      <div className="hidden gap-4 md:flex">
        {filters.map(({ name, value }) => (
          <Button
            key={value}
            className={`rounded-lg px-6 py-2 outline-none ${
              activeFilter === value
                ? "background-light800_dark400 text-primary-500"
                : "background-light800_dark300 text-light-500"
            }`}
            onClick={() => setActiveFilter(value)}
          >
            {name}
          </Button>
        ))}
      </div>

      <div className={`${otherClasses} relative`}>
        <Select>
          <SelectTrigger className="background-light800_dark300 body-regular light-border-2 absolute h-full w-full rounded-lg border px-6 text-light-500 dark:border-none">
            <div className="line-clamp-1">
              <SelectValue placeholder="Select a Filter" />
            </div>
          </SelectTrigger>
          <SelectContent className="light-border background-light900_dark200 text-light-500">
            <SelectGroup>
              {filters.map(({ name, value }) => (
                <SelectItem
                  key={value}
                  value={value}
                  className="hover:background-light700_dark100 data-[state=checked]:background-light800_dark300 cursor-pointer data-[state=checked]:text-primary-500"
                >
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default Filters;
