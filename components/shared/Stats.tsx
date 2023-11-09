import React from "react";
import StatsCard from "../cards/StatsCard";

type Props = {
  totalAnswers: number;
  totalQuestions: number;
};

const Stats = ({ totalAnswers, totalQuestions }: Props) => {
  return (
    <div className="mt-10">
      <h3 className="h3-bold text-dark200_light900 mb-5">Stats</h3>

      <div className="grid grid-cols-1 gap-10 xs:grid-cols-2 md:grid-cols-4">
        <div className="card-wrapper light-border background-light900_dark300 flex-between flex-wrap rounded-[10px] border p-6 shadow-light-300 dark:shadow-dark-200">
          <div className="text-dark200_light900">
            <p className="paragraph-semibold">{totalAnswers}</p>
            <span className="text-dark400_light700">Answers</span>
          </div>
          <div className="text-dark200_light900">
            <p className="paragraph-semibold">{totalQuestions}</p>
            <span>Questions</span>
          </div>
        </div>

        <StatsCard
          imgUrl="/assets/icons/gold-medal.svg"
          value={0}
          title="Gold Badge"
        />

        <StatsCard
          imgUrl="/assets/icons/silver-medal.svg"
          value={0}
          title="Silver Badge"
        />

        <StatsCard
          imgUrl="/assets/icons/bronze-medal.svg"
          value={0}
          title="Bronze Badge"
        />
      </div>
    </div>
  );
};

export default Stats;
