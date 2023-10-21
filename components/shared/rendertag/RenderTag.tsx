import Link from "next/link";
import React from "react";

type Props = {
  _id: number;
  name: string;
  totalQuestions: number;
  showCount: number;
};

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between">
      <div className="subtle-regular background-light800_dark300 text-light400_light500 flex items-center rounded-md px-4 py-2 uppercase leading-3 focus:ring-2">
        {name}
      </div>
      <span className="small-regular">{totalQuestions}</span>
    </Link>
  );
};

export default RenderTag;
