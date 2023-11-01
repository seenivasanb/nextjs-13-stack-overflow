import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

type Props = {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
};

const LocalSearchBar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: Props) => {
  return (
    <section
      className={`background-light800_darkgradient light-border-2 flex min-h-[56px] grow items-center gap-4 rounded-[10px] border px-4 ${
        iconPosition === "left" ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <Image
        src={imgSrc}
        alt="search-icon"
        width={24}
        height={24}
        className="cursor-pointer"
      />

      <Input
        type="text"
        placeholder={placeholder}
        className="paragraph-regular no-focus placeholder text-dark100_light900 border-none bg-transparent shadow-none outline-none"
      />
    </section>
  );
};

export default LocalSearchBar;
