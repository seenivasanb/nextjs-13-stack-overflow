import { getQuestionById } from "@/actions/question.action";
import { getUserById } from "@/actions/user.action";
import AllAnswers from "@/components/shared/AllAnswers";
import Metrics from "@/components/shared/Metrics";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Answer from "@/components/forms/Answer";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Votes from "@/components/shared/Votes";

type Props = {
  params: any;
};

const Question = async ({ params }: Props) => {
  const question = await getQuestionById({ questionId: params.id });
  const { userId } = auth();

  let mongoUser;
  if (userId) mongoUser = await getUserById({ userId });

  const { author, title, createdOn, content, tags } = question;

  return (
    <section>
      <div className="sm:flex-between mt-4 flex flex-col-reverse gap-4 sm:flex-row">
        <Link href={`/profile/${author.clerkId}`} className="flex-start">
          <Image
            src={author.picture}
            width={22}
            height={22}
            alt="author"
            className="mr-1 rounded-[10px]"
          />
          <p className="paragraph-semibold text-dark300_light700">
            {author.name}
          </p>
        </Link>

        <Votes
          type="question"
          itemId={JSON.stringify(question._id)}
          userId={JSON.stringify(mongoUser._id)}
          upvotes={question.upvotes.length}
          isUpvoted={question.upvotes.includes(mongoUser._id)}
          downvotes={question.downvotes.length}
          isDownvoted={question.downvotes.includes(mongoUser._id)}
          isSaved={mongoUser?.saved.includes(question._id)}
        />
      </div>

      <div className="mt-[14px] flex">
        <h3 className="h3-bold text-dark200_light900">{title}</h3>
      </div>

      <div className="mt-[18px] flex gap-4">
        <Metrics
          imgUrl="/assets/icons/clock-2.svg"
          alt="time"
          value={getTimeStamp(createdOn)}
          title=""
          textStyle="small-medium text-dark400_light700"
        />

        <Metrics
          imgUrl="/assets/icons/message.svg"
          alt="Answer"
          value={formatNumber(question.views)}
          title="Answers"
          textStyle="small-medium text-dark400_light700"
        />

        <Metrics
          imgUrl="/assets/icons/eye.svg"
          alt="Views"
          value={formatNumber(question.views)}
          title="Views"
          textStyle="small-medium text-dark400_light700"
        />
      </div>

      <div className="text-dark400_light700 body-regular mt-[30px]">
        <ParseHTML data={content} />
      </div>

      <div className="mt-9 flex flex-row flex-wrap gap-2">
        {tags.length > 0 &&
          tags.map((tag: any) => (
            <RenderTag _id={tag._id} name={tag.name} key={tag._id} />
          ))}
      </div>

      <div className="mb-14 mt-10">
        <AllAnswers
          questionId={question._id}
          userId={JSON.stringify(mongoUser._id)}
          totalAnswers={question.answers.length}
        />
      </div>

      <div className="mt-10">
        <Answer
          question={content}
          questionId={JSON.stringify(question._id)}
          authorId={JSON.stringify(mongoUser._id)}
        />
      </div>
    </section>
  );
};

export default Question;
