import React from "react";
import Link from "next/link";

type Props = {
  _id: string;
  name: string;
  questions: string[];
};

const TagCard = ({ _id, name, questions }: Props) => {
  return (
    <article className="card-wrapper light-border shadow-light100_darknone w-[262px] flex-col flex-wrap rounded-[10px] border p-[30px]">
      <div className="background-light700_dark400 w-fit rounded-[4px] px-5 py-1">
        <Link
          href={`/tags/${_id}`}
          className="paragraph-medium text-dark100_light900"
        >
          {name}
        </Link>
      </div>

      <p className="small-regular text-dark500_light700 mt-[18px]">
        JavaScript, often abbreviated as JS, is a programming language that is
        one of the core technologies of the World Wide Web, alongside HTML and
        CSS
      </p>

      <p className="small-medium text-dark400_light500 mt-3.5">
        <span className="body-semibold primary-text-gradient mr-2">
          {questions.length}+
        </span>
        Questions
      </p>
    </article>
  );
};

export default TagCard;
