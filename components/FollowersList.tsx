import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
type props = {
  list: User[];
};

const FollowersList = ({ list }: props) => {
  return (
    <div className="pt-8 px-4">
      {list.length === 0 && <p className="text-center">You don&apos;t have any followers yet!</p>}
      <div className="flex flex-col gap-5 text-sm">
        {list.map((user, index) => {
          if (index < 5)
            return (
              <div key={user.uid} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* avatar */}
                  <Avatar className="w-[40px] h-[40px]">
                    <AvatarImage
                      src={user.profile_pic_url}
                      alt="User's avatar"
                    />
                    <AvatarFallback>{user.username}</AvatarFallback>
                  </Avatar>
                  {/* username  */}
                  <p>{user.username}</p>
                </div>
                {/* button to unfollow */}
                <Button className="h-[30px] bg-pink-600">Following</Button>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default FollowersList;
