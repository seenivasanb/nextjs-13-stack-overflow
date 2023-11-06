"use server";

import { connectToDB } from "@/db/mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Answer from "@/db/models/answer.model";
import Question from "@/db/models/question.model";
import { revalidatePath } from "next/cache";

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    await connectToDB();

    const { author, content, path, question } = params;
    const answer = await Answer.create({ author, content, question });

    if (answer) {
      await Question.findByIdAndUpdate(question, {
        $push: { answers: answer._id },
      });
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const getAllAnswers = async (params: GetAnswersParams) => {
  try {
    await connectToDB();

    const { questionId } = params;
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return answers;
  } catch (error) {
    console.log(error);
  }
};

export const upvoteAnswer = async (params: AnswerVoteParams) => {
  try {
    await connectToDB();

    const { answerId, isDownvoted, isUpvoted, path, userId } = params;
    let updateQuery = {};

    if (isUpvoted) {
      updateQuery = {
        $pull: {
          upvotes: userId,
        },
      };
    } else if (isDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: {
          upvotes: userId,
        },
      };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const downvoteAnswer = async (params: AnswerVoteParams) => {
  try {
    await connectToDB();

    const { answerId, isDownvoted, isUpvoted, path, userId } = params;
    let updateQuery = {};

    if (isDownvoted) {
      updateQuery = {
        $pull: {
          downvotes: userId,
        },
      };
    } else if (isUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: {
          downvotes: userId,
        },
      };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};
