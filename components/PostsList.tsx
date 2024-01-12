import { CameraIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Tweetform from "./Tweetform";
import PostCard from "./PostCard";

type props = {
  list: Post[];
  user: User;
};

const PostsList = ({ list, user }: props) => {
  return (
    <div className=" my-6 min-h-screen w-full lg:w-3/5 lg:mx-auto">
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
              <Tweetform user={user} />
            </DialogContent>
          </Dialog>
        </div>
      )}
      <div className="px-4 flex flex-col gap-4">
        {list.length !== 0 &&
          list.map((post, index) => {
            return <PostCard post={post} key={index} />;
          })}
      </div>
    </div>
  );
};

export default PostsList;
