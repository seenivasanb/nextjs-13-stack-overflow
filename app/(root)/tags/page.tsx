import Filters from "@/components/shared/Filters";
import TagsCardList from "@/components/shared/TagsCardList";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { TagFilters } from "@/constants/filters";
import React from "react";

const Tags = () => {
  return (
    <section>
      <div className="flex-between mb-[30px] flex flex-row">
        <h1 className="h1-bold text-dark100_light900">Tags</h1>
      </div>
      <div className="flex flex-col gap-[30px] sm:flex-row md:flex-col">
        <LocalSearchBar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for question"
          otherClasses="flex-1"
        />
        <Filters
          filters={TagFilters}
          otherClasses="w-full h-full min-h-[56px] sm:w-[170px] md:hidden"
        />
      </div>
      <div className="mt-12">
        <TagsCardList />
      </div>
    </section>
  );
};

export default Tags;
