import Filters from "@/components/shared/Filters";
import UserCardList from "@/components/shared/UserCardList";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { UserFilters } from "@/constants/filters";
import React from "react";

const Community = () => {
  return (
    <section>
      <div className="flex-between mb-[30px] flex flex-row">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>
      <div className="flex flex-col gap-[30px] sm:flex-row md:flex-col">
        <LocalSearchBar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for question"
          otherClasses="flex-1"
        />
        <Filters
          filters={UserFilters}
          otherClasses="w-full h-full min-h-[56px] sm:w-[170px] md:hidden"
          containerClasses="md:hidden flex min-h-[56px] sm:w-[170px]"
        />
      </div>
      <div className="mt-4">
        <UserCardList />
      </div>
    </section>
  );
};

export default Community;
