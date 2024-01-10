"use client";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostsList from "@/components/PostsList";
import FollowersList from "@/components/FollowersList";
import FollowingList from "@/components/FollowingList";
import { users } from "@/constants/users";
import { posts } from "@/constants/posts";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/Firebase";
import { useRouter } from "next/navigation";
import { getFollowers } from "@/lib/user";
import { doc, getDoc } from "firebase/firestore";

function stylesBasedOnChoice(intent: string, choice: string) {
  if (choice === intent) {
    return "text-pink-600 font-semibold border-b-4 border-b-pink-600";
  } else return "text-gray-700";
}

const ProfilePage = () => {
  const [choice, setChoice] = React.useState("following");
  const [user, setUser] = React.useState<User | null>(null);
  const [followers, setFollowers] = React.useState<User[]>([]);
  const { push } = useRouter();

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setUser(docSnap.data() as User);
        const followerList = await getFollowers(user.uid);
        setFollowers(followerList);
        // ...
      } else {
        // User is signed out
        // ...
        push("/login");
      }
    });
  }, [push]);
  return (
    <div className="">
      {/* header */}
      <div className="flex w-full items-center justify-between px-2 mt-5 mb-3">
        <Link href="/" className="text-pink-600">
          <MoveLeftIcon className="w-[20px]" />
        </Link>
        <h1 className="w-full text-center text-2xl">You</h1>
      </div>

      <div className="px-4 border-b border-b-gray-400 ">
        {" "}
        {/* account owner's information */}
        <div className="flex items-center gap-5">
          <Avatar className="w-[80px] h-[80px]">
            <AvatarImage src={user?.profile_pic_url} alt="User's avatar" />
            <AvatarFallback>{user?.email}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{user?.username}</p>
            <p className="text-sm text-gray-400">
              Joined on {new Date(user?.timestamp || "").toDateString()}
            </p>
          </div>
        </div>
        <div className="flex justify-between w-4/5 mx-auto text-sm mt-5">
          <div
            className={`${stylesBasedOnChoice(
              "posts",
              choice
            )} flex flex-col items-center`}
            onClick={() => setChoice("posts")}
          >
            <p>8</p>
            <p>Posts</p>
          </div>
          <div
            className={`${stylesBasedOnChoice(
              "followers",
              choice
            )} flex flex-col items-center`}
            onClick={() => setChoice("followers")}
          >
            <p>16</p>
            <p>Followers</p>
          </div>
          <div
            className={`${stylesBasedOnChoice(
              "following",
              choice
            )} flex flex-col items-center`}
            onClick={() => setChoice("following")}
          >
            <p>34</p>
            <p>Following</p>
          </div>
        </div>
      </div>

      <div>
        {choice === "following" ? (
          <FollowingList list={users} />
        ) : choice === "followers" ? (
          <FollowersList list={users} />
        ) : (
          <PostsList list={posts} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
