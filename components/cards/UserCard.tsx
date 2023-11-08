import { getTopInteractedTags } from "@/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";

type Props = {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
  reputation: string;
  saved: string;
  joinedOn: string;
};

const UserCard = async ({ _id, clerkId, name, username, picture }: Props) => {
  const tags = await getTopInteractedTags({ userId: _id, limit: 3 });

  return (
    <article className="card-wrapper light-border flex-center mt-12 w-full flex-col flex-wrap rounded-[10px] border p-[30px] sm:w-[262px]">
      <Image
        src={picture}
        alt="username"
        width={100}
        height={100}
        className="rounded-full"
      />
      <h3 className="h3-bold text-dark100_light900 mt-[18px]">{name}</h3>
      <Link
        href={`/profile/${clerkId}`}
        className="text-dark500_light500 mt-[7px]"
      >
        <span>@{username}</span>
      </Link>

      <div className="mt-5 flex gap-2">
        {tags?.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
    </article>
  );
};

export default UserCard;
