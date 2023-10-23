import Link from "next/link";
import React from "react";

type Props = {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
};

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between">
      <div className="subtle-regular background-light800_dark300 text-light400_light500 flex items-center rounded-md px-4 py-2 uppercase leading-3 focus:ring-2">
        {name}
      </div>
      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  );
};

export default RenderTag;
