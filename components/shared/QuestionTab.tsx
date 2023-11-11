import { getUserQuestions } from "@/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "../cards/QuestionCard";

interface Props extends SearchParamsProps {
  searchProps: string;
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchProps, userId, clerkId }: Props) => {
  const result = await getUserQuestions({
    userId,
    page: 1,
  });

  return (
    <>
      {result?.questions.map((question) => (
        <QuestionCard
          clerkId={clerkId!}
          key={JSON.stringify(question._id)}
          id={question._id}
          itemId={JSON.stringify(question._id)}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes.length}
          views={question.views}
          answers={question.answers}
          createdOn={question.createdOn}
          type="question"
        />
      ))}
    </>
  );
};

export default QuestionTab;
