import AskQuestion from "@/components/shared/AskQuestion";
import React from "react";

const Page = () => {
  return (
    <section className="flex flex-col">
      <h1 className="h1-bold text-dark100_light900 mb-8">
        Ask a public question
      </h1>

      <AskQuestion />
    </section>
  );
};

export default Page;
