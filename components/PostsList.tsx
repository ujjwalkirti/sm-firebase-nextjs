import { CameraIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Tweetform from "./Tweetform";

type props = {
  list: Post[];
};

TimeAgo.addDefaultLocale(en);
const PostsList = ({ list }: props) => {
  return (
    <div className=" my-6">
      {list.length === 0 && (
        <div className="flex flex-col items-center gap-4 my-10 px-2 text-gray-500 text-sm pt-8">
          <CameraIcon className="" />
          <p>You haven&apos;t posted anything yet</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-pink-600">Make your first post!</Button>
            </DialogTrigger>
            <DialogContent className="w-11/12 mx-auto">
              <DialogHeader className="flex items-center">
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <Tweetform />
            </DialogContent>
          </Dialog>
        </div>
      )}
      <div className="px-4 flex flex-col gap-4">
        {list.map((post) => (
          <div
            key={post.id}
            className="border-b border-b-gray-200 px-4 py-5 flex  gap-3 text-sm shadow-lg rounded-md bg-white"
          >
            <Avatar className="w-[40px] h-[40px]">
              <AvatarImage src={"/assets/avatar.png"} alt="User's avatar" />
              <AvatarFallback>{post.author}</AvatarFallback>
            </Avatar>
            <div className="">
              <p className="font-semibold">{post.author}</p>
              <ReactTimeAgo
                date={new Date(post.timestamp)}
                locale="en-US"
                timeStyle="twitter"
                className="text-gray-500 text-xs"
              />
              <p className="text-gray-500 mt-4">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;
