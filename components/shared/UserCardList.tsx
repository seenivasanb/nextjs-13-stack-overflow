import { getAllUsers } from "@/actions/user.action";
import React from "react";
import UserCard from "../cards/UserCard";
import NoResults from "./NoResults";

const UserCardList = async () => {
  const users = await getAllUsers({});

  return (
    <div className="flex flex-wrap gap-4">
      {users?.length && users.length > 0 ? (
        <>
          {users.map(
            ({
              _id,
              clerkId,
              name,
              username,
              email,
              picture,
              reputation,
              saved,
              joinedOn,
            }) => (
              <UserCard
                key={_id}
                _id={_id}
                clerkId={clerkId}
                name={name}
                username={username}
                email={email}
                picture={picture}
                reputation={reputation}
                saved={saved}
                joinedOn={joinedOn}
              />
            )
          )}
        </>
      ) : (
        <NoResults
          title="There’s no users to show"
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
        />
      )}
    </div>
  );
};

export default UserCardList;
