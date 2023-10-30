"use client";

import Filters from "@/components/shared/Filters";
import NoResults from "@/components/shared/NoResults";
import QuestionCard from "@/components/shared/cards/QuestionCard";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    id: "1",
    title: "Cascading Deletes in SQLAlchemy",
    tags: [
      { id: "1", name: "python" },
      { id: "2", name: "sql" },
    ],
    author: { id: "12", name: "Seenivasan" },
    upvotes: 104324,
    views: 1212300,
    answers: [],
    createdAt: new Date("2023-09-01T12:00:00.000Z"),
  },
  {
    id: "2",
    title: "How to center a div",
    tags: [
      { id: "1", name: "css" },
      { id: "2", name: "scss" },
    ],
    author: { id: "12", name: "Senthil" },
    upvotes: 41211,
    views: 532123,
    answers: [],
    createdAt: new Date("2023-02-25T12:00:00.000Z"),
  },
];

export default function Home() {
  return (
    <section id="home-page">
      <div className="flex-between mb-[30px] flex flex-row">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
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
          otherClasses="flex-1"
        />
        <Filters
          filters={HomePageFilters}
          otherClasses="w-full h-full min-h-[56px] sm:w-[170px] md:hidden"
          containerClasses=""
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions?.length > 0 ? (
          questions.map((question) => (
            <QuestionCard key={question.id} {...question} />
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
}
