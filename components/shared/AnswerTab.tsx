import { getUserAnswers } from "@/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "../cards/QuestionCard";

interface Props extends SearchParamsProps {
  searchProps: string;
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ searchProps, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: 1,
  });

  return (
    <>
      {result?.answers.map((answer) => {
        return (
          <QuestionCard
            clerkId={clerkId!}
            key={JSON.stringify(answer._id)}
            id={answer.question._id}
            itemId={JSON.stringify(answer._id)}
            title={answer.question.title}
            tags={answer.tags}
            author={answer.author}
            upvotes={answer.upvotes.length}
            views={answer.views}
            answers={answer.answers}
            createdOn={answer.createdOn}
            type="answer"
          />
        );
      })}
    </>
  );
};

export default AnswerTab;
