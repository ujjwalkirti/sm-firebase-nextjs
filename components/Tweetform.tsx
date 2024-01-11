import React from "react";
import { Input } from "./ui/input";
import { MapPinIcon, Send, SmileIcon } from "lucide-react";
import { Button } from "./ui/button";
import { push, ref, serverTimestamp, set } from "firebase/database";
import { auth, realtimeDB } from "@/lib/Firebase";

type props = {
  user: User;
};

const Tweetform = ({ user }: props) => {
  const [content, setContent] = React.useState<string>("");
  const [caption, setCaption] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tweetsRef = ref(realtimeDB, "tweets");
    const newTweetRef = push(tweetsRef);
    await set(newTweetRef, {
      content,
      caption,
      location,
      author: user,
      timestamp: serverTimestamp(),
      // Add other tweet data here
    });

    alert("Tweet has been posted");
  };
  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <textarea
          placeholder="Type here"
          name="content"
          onChange={(e) => {
            if (e.target.value.length > 200) {
              alert("Max 200 characters");
            }
          }}
          className="border w-full p-2 h-[300px] outline-none"
        />
        <div className="flex items-center border rounded pr-2">
          <Input
            placeholder="Add Caption"
            type="text"
            required
            name="caption"
            className="border-none"
          />
          <SmileIcon />
        </div>
        <div className="flex items-center border rounded pr-2">
          <Input
            placeholder="Add Location"
            type="text"
            name="location"
            required
            className="border-none outline-none"
          />
          <MapPinIcon />
        </div>
        <Button className="bg-pink-600 w-full">
          <Send /> Post
        </Button>
      </form>
    </div>
  );
};

export default Tweetform;
