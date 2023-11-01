import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MISSING MONGODB URL");
  }

  if (isConnected) {
    return console.log("DB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "dev_overflow",
    });

    isConnected = true;
    console.log("DB is connected successfully");
  } catch (error) {
    isConnected = false;
    console.log("DB connection is failed", error);
  }
};
