import Image from "next/image";
import React from "react";

type Props = {
  imgUrl: string;
  value: number;
  title: string;
};

const StatsCard = ({ imgUrl, title, value }: Props) => {
  return (
    <div className="card-wrapper light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} width={36} height={50} alt={title} />
      <div>
        <p className="text-dark200_light900 paragraph-semibold">{value}</p>
        <span className="text-dark400_light700">{title}</span>
      </div>
    </div>
  );
};

export default StatsCard;
