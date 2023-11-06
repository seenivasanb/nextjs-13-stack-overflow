import { connectToDB } from "@/db/mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/db/models/tag.model";

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
