"use client";

import { sidebarLinks } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const LeftSideBar = () => {
  const pathName = usePathname();
  const { userId } = useAuth();

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-fit flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map(({ imgURL, label, route }) => {
          const isActive =
            pathName === route ||
            (route.length > 2 && pathName.includes(route));

          if (route === "/profile") {
            if (userId) {
              route = `/profile/${userId}`;
            } else {
              return null;
            }
          }

          return (
            <Link href={route} key={route}>
              <button
                className={`${
                  isActive
                    ? "primary-gradient base-bold rounded-lg text-light-900"
                    : "text-dark300_light900 base-medium"
                } flex w-[52px] items-center justify-start gap-4 bg-transparent p-4 lg:w-full`}
              >
                <Image
                  src={imgURL}
                  height={20}
                  width={20}
                  alt={label}
                  className={`${isActive ? "" : "invert-colors"}`}
                />
                <p className="hidden lg:block">{label}</p>
              </button>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none ">
              <span className="primary-text-gradient hidden lg:block">
                Log In
              </span>
              <Image
                src="/assets/icons/user.svg"
                width={20}
                height={20}
                alt="Sign In"
                className="invert-colors lg:hidden"
              />
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              className="small-medium light-border-2 btn-tertiary
                   text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
            >
              <span className="hidden lg:block">Sign Up</span>
              <Image
                src="/assets/icons/sign-up.svg"
                width={20}
                height={20}
                alt="Sign In"
                className="invert-colors lg:hidden"
              />
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSideBar;
