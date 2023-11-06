"use client";

import { formatNumber } from "@/lib/utils";
import React, { useEffect } from "react";
import Image from "next/image";
import { downvoteQuestion, upvoteQuestion } from "@/actions/question.action";
import { usePathname } from "next/navigation";
import { downvoteAnswer, upvoteAnswer } from "@/actions/answer.action";
import { toggleSaveQuestion } from "@/actions/user.action";
import { viewQuestion } from "@/actions/interaction.action";

type Props = {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  isUpvoted: boolean;
  downvotes: number;
  isDownvoted: boolean;
  isSaved?: boolean;
};

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  isUpvoted,
  downvotes,
  isDownvoted,
  isSaved,
}: Props) => {
  const pathname = usePathname();

  const handleVote = async (action: string) => {
    if (!userId) {
      return;
    }

    try {
      if (type === "question") {
        const questionOptions = {
          isDownvoted,
          isUpvoted,
          path: pathname,
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
        };

        if (action === "upvote") {
          await upvoteQuestion(questionOptions);
        } else {
          await downvoteQuestion(questionOptions);
        }
      } else {
        const answerOptions = {
          isDownvoted,
          isUpvoted,
          path: pathname,
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
        };

        if (action === "upvote") {
          await upvoteAnswer(answerOptions);
        } else {
          await downvoteAnswer(answerOptions);
        }
      }
    } catch (error) {}
  };

  const handleSave = async () => {
    await toggleSaveQuestion({
      path: pathname,
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
    });
  };

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId]);

  return (
    <div className="flex gap-5">
      <div className="flex gap-2.5">
        <div className="flex-center gap-1">
          <Image
            src={
              isUpvoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1">
          <Image
            src={
              isDownvoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>

        {type === "question" && (
          <Image
            src={
              isSaved
                ? "/assets/icons/star-filled.svg"
                : "/assets/icons/star-red.svg"
            }
            width={18}
            height={18}
            alt="star"
            className="cursor-pointer"
            onClick={() => handleSave()}
          />
        )}
      </div>
    </div>
  );
};

export default Votes;
