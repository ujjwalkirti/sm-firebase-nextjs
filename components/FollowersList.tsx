import React from "react";
import UserCard from "./UserCard";

type ExtendedUser = User & {
  beingFollowedByCurrentAuthUser?: boolean;
};

type props = {
  list: ExtendedUser[];
};

const FollowersList = ({ list }: props) => {
  return (
    <div className="pt-8 px-4">
      {list.length === 0 && (
        <p className="text-center">You don&apos;t have any followers yet!</p>
      )}
      <div className="flex flex-col gap-5 text-sm">
        {list.map((user, index) => {
          return <UserCard user={user} key={index} />;
        })}
      </div>
    </div>
  );
};

export default FollowersList;
