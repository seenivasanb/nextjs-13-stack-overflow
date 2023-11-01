import { getUserById } from "@/actions/user.action";
import Question from "@/components/shared/question";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <section className="flex flex-col">
      <h1 className="h1-bold text-dark100_light900 mb-8">
        Ask a public question
      </h1>

      <Question mongoUserId={JSON.stringify(mongoUser._id)} />
    </section>
  );
};

export default Page;
