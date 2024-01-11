import React from "react";
import { Input } from "./ui/input";
import {
  CheckCircle,
  CheckCircleIcon,
  HourglassIcon,
  MapPinIcon,
  Send,
  SmileIcon,
} from "lucide-react";
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
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<string | null>("not-started");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("started");

    const tweetsRef = ref(realtimeDB, "tweets");
    const newTweetRef = push(tweetsRef);
    try {
      await set(newTweetRef, {
        content,
        caption,
        location,
        author: user,
        timestamp: serverTimestamp(),
        // Add other tweet data here
      });
      setStatus("posted");
      setError(null);
    } catch (error) {
      setError(error as string);
      setStatus("error");
    }
  };
  return (
    <div>
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      {status === "posted" && (
        <div className="flex flex-col items-center gap-2 mt-5">
          <CheckCircleIcon className="text-pink-600" />
          <p>Tweet Successfully posted!</p>
        </div>
      )}
      {status === "started" && (
        <div className="flex flex-col items-center gap-2 mt-5">
          <HourglassIcon className="text-pink-600" />
          <p>Posting...</p>
        </div>
      )}
      {status === "not-started" && (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <textarea
            placeholder="Type here"
            name="content"
            value={content}
            onChange={(e) => {
              if (e.target.value.length > 200) {
                alert("Max 200 characters");
              } else {
                setContent(e.target.value);
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
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <MapPinIcon />
          </div>
          <Button className="bg-pink-600 w-full">
            <Send /> Post
          </Button>
        </form>
      )}
    </div>
  );
};

export default Tweetform;
