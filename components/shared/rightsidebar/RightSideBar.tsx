import { HotQuestions, PopularTags } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../rendertag/RenderTag";

const RightSideBar = () => {
  return (
    <section className="background-light900_dark200 text-dark300_light900 body-regular custom-scrollbar sticky flex min-h-screen flex-col justify-start border-r px-6 pb-8 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[330px]">
      <div className="mb-[60px]">
        <h3 className="h3-bold mb-7">Hot Network</h3>
        <div className="flex flex-col gap-[30px]">
          {HotQuestions.map((question) => {
            return (
              <Link
                href={`/questions/${question._id}`}
                key={question._id}
                className="flex gap-2"
              >
                <span className="flex-1">{question.title}</span>
                <span>
                  <Image
                    src="/assets/icons/chevron-right.svg"
                    width="20"
                    height="20"
                    alt="arrow"
                    className="invert-colors"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="h3-bold mb-7">Popular Tags</h3>
        <div className="flex flex-col gap-4">
          {PopularTags.map((tag) => (
            <RenderTag key={tag._id} {...tag} showCount={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
