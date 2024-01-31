import React from "react";
import UserCard from "./UserCard";
import Loader from "./Loader";

type ExtendedUser = User & {
  beingFollowedByCurrentAuthUser?: boolean;
};

type props = {
  list: ExtendedUser[];
};

const FollowersList = ({ list }: props) => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 1.5 * 1000);
  }, []);
  return (
    <div className="pt-8 px-4">
      {list.length === 0 && !loading && (
        <p className="text-center">You don&apos;t have any followers yet!</p>
      )}
      {list.length !== 0 && loading && (
        <div className="flex justify-center w-full">
          <Loader isLoading={loading} />
        </div>
      )}
      {list.length !== 0 && !loading && (
        <div className="flex flex-col gap-5 text-sm">
          {list.map((user, index) => {
            return <UserCard user={user} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default FollowersList;
