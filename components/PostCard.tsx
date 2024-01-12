import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";

type props = {
  post: Post;
};

TimeAgo.addDefaultLocale(en);

const PostCard = ({ post }: props) => {

  return (
    <div className="border-b border-b-gray-200 px-4 py-5 flex  gap-3 text-sm shadow-lg rounded-md bg-white">
      <Avatar className="w-[40px] h-[40px]">
        <AvatarImage src={"/assets/avatar.png"} alt="User's avatar" />
        <AvatarFallback>{post.author.username}</AvatarFallback>
      </Avatar>
      <div className="">
        <p className="font-semibold">{post.author.username}</p>
        <ReactTimeAgo
          date={new Date(post.timestamp)}
          locale="en-US"
          timeStyle="twitter"
          className="text-gray-500 text-xs"
        />
        <p className="text-gray-500 mt-4">{post.content}</p>
      </div>
    </div>
  );
};

export default PostCard;
