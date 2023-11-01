import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  title?: string;
  description?: string;
  linkUrl?: string;
  linkTitle?: string;
};

const NoResults = ({ title, description, linkTitle, linkUrl }: Props) => {
  return (
    <section className="flex-center mt-10 flex w-full flex-col">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="hidden object-contain dark:block"
      />

      {title && (
        <h2 className="h2-bold text-dark200_light900 mt-[30px]">{title}</h2>
      )}

      {description && (
        <p className="body-regular text-dark500_light700 my-4 max-w-sm text-center">
          {description}
        </p>
      )}

      {linkUrl && (
        <Link href={linkUrl}>
          <Button className="paragraph-medium primary-gradient mt-5 min-w-[46px] rounded-lg px-6 py-3 text-primary-100">
            {linkTitle}
          </Button>
        </Link>
      )}
    </section>
  );
};

export default NoResults;
