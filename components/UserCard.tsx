import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { followCurrentUser, unFollowCurrentUser } from "@/lib/user";
type ExtendedUser = User & {
  beingFollowedByCurrentAuthUser?: boolean;
};

type props = {
  user: ExtendedUser;
};
const UserCard = ({ user }: props) => {
  const [isFollowing, setIsFollowing] = React.useState(
    user.beingFollowedByCurrentAuthUser
  );
  return (
    <div key={user.email} className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* avatar */}
        <Avatar className="w-[40px] h-[40px]">
          <AvatarImage src={user.profile_pic_url} alt="User's avatar" />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>
        {/* username  */}
        <p>{user.username}</p>
      </div>
      {/* button to unfollow */}
      {isFollowing ? (
        <Button
          onClick={async () => {
            setIsFollowing(!isFollowing);
            await unFollowCurrentUser(user.email);
          }}
          className="h-[30px] bg-pink-600"
        >
          Following
        </Button>
      ) : (
        <Button
          onClick={async () => {
            setIsFollowing(!isFollowing);
            await followCurrentUser(user.email);
          }}
          className="h-[30px] bg-white hover:bg-pink-600 hover:text-white text-pink-600 border border-pink-600"
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default UserCard;
