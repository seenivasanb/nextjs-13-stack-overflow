import { getAllTags } from "@/actions/tag.action";
import React from "react";
import NoResults from "./NoResults";
import TagCard from "../cards/TagCard";

const TagsCardList = async () => {
  const tags = await getAllTags({});

  return (
    <div className="flex flex-wrap gap-4">
      {tags!?.length > 0 ? (
        tags?.map((tag) => (
          <TagCard
            key={tag._id}
            _id={tag.name}
            name={tag.name}
            questions={tag.questions}
          />
        ))
      ) : (
        <NoResults
          title="No Tags Found"
          description="It looks like there are no tags found"
          linkUrl="/ask-questions"
          linkTitle="Ask a question"
        />
      )}
    </div>
  );
};

export default TagsCardList;
