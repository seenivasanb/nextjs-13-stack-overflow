import { getQuestionsByTagId } from "@/actions/tag.action";
import QuestionCard from "@/components/cards/QuestionCard";
import Filters from "@/components/shared/Filters";
import NoResults from "@/components/shared/NoResults";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { Link } from "lucide-react";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};
const Tag = async ({ params }: Props) => {
  const { id } = params;
  const result = await getQuestionsByTagId({ tagId: id });

  return (
    <section id="home-page">
      <div className="flex-between mb-[30px] flex flex-row">
        <h1 className="h1-bold text-dark100_light900 tracking-wide">
          {result?.tagTitle.toUpperCase()}
        </h1>
        <Link href="/ask-question">
          <Button className="primary-gradient paragraph-medium items-center px-6 py-4 text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-[30px] sm:flex-row md:flex-col">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for question"
          otherClasses=""
        />
        <Filters
          filters={HomePageFilters}
          otherClasses="w-full h-full min-h-[56px] sm:w-[170px] md:hidden"
          containerClasses="md:hidden flex min-h-[56px] sm:w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions?.length > 0 ? (
          result?.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes.length}
              views={question.views}
              answers={question.answers}
              createdOn={question.createdOn}
              itemId={JSON.stringify(question._id)}
              type="question"
            />
          ))
        ) : (
          <NoResults
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            linkUrl="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </section>
  );
};

export default Tag;
