import Link from "next/link";
import React from "react";
import RenderTag from "../rendertag/RenderTag";
import Metrics from "../metrics/Metrics";
import { formatNumber, getTimeStamp } from "@/lib/utils";

type TagType = {
  id: string;
  name: string;
};

type AuthorType = {
  id: string;
  name: string;
  picture?: string;
};

type AnswerType = {
  id: string;
  title: string;
};

type Props = {
  id: string;
  title: string;
  tags: TagType[];
  author: AuthorType;
  upvotes: number;
  views: number;
  answers: AnswerType[];
  createdAt: Date;
};

const QuestionCard = ({
  answers,
  author,
  createdAt,
  id,
  tags,
  title,
  upvotes,
  views,
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-wrap-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>

          <Link href={`/question/${id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag.id} _id={tag.id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 flex w-full flex-wrap gap-3">
        <Metrics
          imgUrl="/assets/icons/avatar.svg"
          alt="Author"
          value={author.name}
          title={` - asked 1 hour ago ${getTimeStamp(createdAt)}`}
          href={`/profile/${author.id}`}
          textStyle="small-medium text-dark400_light800"
          isAuthor
        />

        <Metrics
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatNumber(upvotes)}
          title="Votes"
          textStyle="small-medium text-dark400_light800"
        />
        <Metrics
          imgUrl="/assets/icons/message.svg"
          alt="Answers"
          value={formatNumber(answers.length)}
          title="Answers"
          textStyle="small-medium text-dark400_light800"
        />
        <Metrics
          imgUrl="/assets/icons/eye.svg"
          alt="Views"
          value={formatNumber(views)}
          title="Views"
          textStyle="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;