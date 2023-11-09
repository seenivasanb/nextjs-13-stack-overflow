"use client";

import { deleteAnswer } from "@/actions/answer.action";
import { deleteQuestion } from "@/actions/question.action";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  type?: string;
  itemId: string;
};

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const handleEdit = () => {};
  const handleDelete = async () => {
    if (type === "question") {
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname,
      });
    } else if (type === "answer") {
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      });
    }
  };

  return (
    <div className="flex-center gap-3 max-sm:w-full">
      <Image
        src="/assets/icons/edit.svg"
        alt="Edit"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleEdit}
      />
      <Image
        src="/assets/icons/trash.svg"
        alt="Delete"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
