import { connectToDB } from "@/db/mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import { FilterQuery } from "mongoose";
import Question from "@/db/models/question.model";
import User from "@/db/models/user.model";
import Tag, { ITag } from "@/db/models/tag.model";

export const getTopInteractedTags = async (
  params: GetTopInteractedTagsParams
) => {
  try {
    await connectToDB();
    const { userId, limit } = params;
    const tags = await Tag.find({ userId }).limit(limit!);

    return tags;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTags = async (params: GetAllTagsParams) => {
  try {
    await connectToDB();
    const tags = await Tag.find({});

    return tags;
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionsByTagId = async (
  params: GetQuestionsByTagIdParams
) => {
  try {
    await connectToDB();

    const {
      tagId,
      // page = 1, pageSize = 10,
      searchQuery,
    } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdOn: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    return { tagTitle: tag.name, questions: tag.questions };
  } catch (error) {}
};
