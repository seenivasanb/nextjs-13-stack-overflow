"use client";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBarLinks = () => {
  const pathName = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map(({ imgURL, label, route }) => {
        const isActive =
          pathName === route || (route.length > 2 && pathName.includes(route));

        return (
          <SheetClose
            asChild
            key={route}
            className={`${
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900"
            } flex items-center justify-start gap-4 bg-transparent p-4`}
          >
            <Link href={route}>
              <Image
                src={imgURL}
                height={20}
                width={20}
                alt={label}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p>{label}</p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

export default SideBarLinks;
