import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <nav
      className="flex-between
        background-light900_dark200
        fixed
        z-50
        w-full
        gap-5
        p-6
        shadow-light-300
        dark:shadow-none
        sm:px-12"
    >
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          width="23"
          height="23"
          alt="Dev Overflow"
        />
        <p className="h2-bold ml-2 font-spaceGrotesk text-dark-500 dark:text-light-900 max-sm:hidden">
          Dev <span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      Global Search
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default NavBar;
