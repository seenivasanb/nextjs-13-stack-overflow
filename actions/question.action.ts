"use server";

import Question from "@/db/models/question.model";
import Tag from "@/db/models/tag.model";
import { connectToDB } from "@/db/mongoose";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import User from "@/db/models/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/db/models/answer.model";
import Interaction from "@/db/models/interaction.model";

export const getQuestions = async (params: GetQuestionsParams) => {
  try {
    await connectToDB();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdOn: -1 });

    return { questions };
  } catch (error) {
    console.log("Fetching questions is failed\n", error);
  }
};

export const getQuestionById = async (params: GetQuestionByIdParams) => {
  try {
    await connectToDB();

    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.log("Fetching questions is failed\n", error);
  }
};

export const createQuestion = async (params: CreateQuestionParams) => {
  try {
    await connectToDB();

    const { title, content, tags, author, path } = params;
    const question = await Question.create({
      title,
      content,
      author,
      path,
    });
    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        {
          $setOnInsert: { name: tag },
          $push: { questions: question._id },
        },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const upvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    const { isDownvoted, isUpvoted, questionId, userId, path } = params;

    let updateQuery = {};

    if (isUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
      };
    } else if (isDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { upvotes: userId },
      };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const downvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    const { isDownvoted, isUpvoted, questionId, userId, path } = params;

    let updateQuery = {};

    if (isDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
      };
    } else if (isUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { downvotes: userId },
      };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = async (params: DeleteQuestionParams) => {
  try {
    await connectToDB();

    const { path, questionId } = params;

    await Question.deleteOne({ _id: questionId });
    await Answer.deleteOne({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany(
      { questions: questionId },
      {
        $pull: {
          questions: questionId,
        },
      }
    );
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const editQuestion = async (params: EditQuestionParams) => {
  try {
    await connectToDB();

    const { content, path, questionId, title } = params;
    const question = await Question.findById(questionId);

    if (!question) {
      throw new Error("Question is not found");
    }

    question.title = title;
    question.content = content;

    await question.save();

    revalidatePath(path);
  } catch (error) {
    console.log("Failed to edit the question");
  }
};
