"use server";

import User from "@/db/models/user.model";
import { connectToDB } from "@/db/mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/db/models/question.model";
import console from "console";

export const getUserById = async (params: GetUserByIdParams) => {
  try {
    await connectToDB();

    const { userId } = params;

    const user = await User.findOne({
      clerkId: userId,
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (params: CreateUserParams) => {
  try {
    await connectToDB();

    const user = await User.create(params);

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  try {
    await connectToDB();

    const { clerkId, path, updateData } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (params: DeleteUserParams) => {
  try {
    await connectToDB();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found!");
    }

    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments and etc

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
  }
};
