import React from "react";
import Filters from "./Filters";
import { AnswerFilters } from "@/constants/filters";
import { getAllAnswers } from "@/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimeStamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";

type Props = {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
};

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const answers = await getAllAnswers({ questionId });

  return (
    <div className="mt-11">
      {totalAnswers ? (
        <div className="flex items-center justify-between">
          <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>

          <Filters
            filters={AnswerFilters}
            containerClasses="w-[200px] h-[36px]"
          />
        </div>
      ) : null}

      <div>
        {answers?.map((answer) => (
          <article
            key={answer._id}
            className="light-border border-b pb-4 pt-10"
          >
            <div className="mb-6 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1 sm:items-center"
              >
                <Image
                  src={answer.author.picture}
                  width={24}
                  height={24}
                  alt="profile"
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {answer.author.name}
                  </p>
                  <p className="small-regular flex-center text-light400_light500 mt-0.5 line-clamp-1">
                    <span className="mx-2 text-xl max-sm:hidden">•</span>
                    answered {getTimeStamp(answer.createdOn)}
                  </p>
                </div>
              </Link>

              <Votes
                type="answer"
                itemId={JSON.stringify(answer._id)}
                userId={userId}
                upvotes={answer.upvotes.length}
                isUpvoted={answer.upvotes.includes(JSON.parse(userId))}
                downvotes={answer.downvotes.length}
                isDownvoted={answer.downvotes.includes(JSON.parse(userId))}
              />
            </div>

            <div id="parse-content" className="text-dark400_light700 ">
              <ParseHTML data={answer.content} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
