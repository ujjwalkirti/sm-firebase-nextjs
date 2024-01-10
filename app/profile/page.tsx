"use client";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostsList from "@/components/PostsList";
import FollowersList from "@/components/FollowersList";
import FollowingList from "@/components/FollowingList";

function stylesBasedOnChoice(intent: string, choice: string) {
  if (choice === intent) {
    return "text-pink-600 font-semibold";
  } else return "text-gray-700";
}

const ProfilePage = () => {
  const [choice, setChoice] = React.useState("following");
  return (
    <div className="">
      {/* header */}
      <div className="flex w-full items-center justify-between px-2 mt-5 mb-3">
        <Link href="/" className="text-pink-600">
          <MoveLeftIcon className="w-[20px]" />
        </Link>
        <h1 className="w-full text-center text-2xl">You</h1>
      </div>
      <div className="px-4 border-b border-b-gray-400">
        {" "}
        <Avatar className="w-[100px] h-[100px]">
          <AvatarImage src="/assets/avatar.png" alt="User's avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p>William Franklin</p>
          <p>Joined on 25 Dec 2019</p>
        </div>
        <div className="flex justify-between w-4/5 mx-auto">
          <div
            className={`${stylesBasedOnChoice(
              "posts",
              choice
            )} flex flex-col items-center`}
          >
            <p>8</p>
            <p>Posts</p>
          </div>
          <div
            className={`${stylesBasedOnChoice(
              "followers",
              choice
            )} flex flex-col items-center`}
          >
            <p>16</p>
            <p>Followers</p>
          </div>
          <div
            className={`${stylesBasedOnChoice(
              "following",
              choice
            )} flex flex-col items-center`}
          >
            <p>34</p>
            <p>Following</p>
          </div>
        </div>
      </div>

      <div>
        {choice === "following" ? (
          <FollowingList />
        ) : choice === "follwers" ? (
          <FollowersList />
        ) : (
          <PostsList />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
