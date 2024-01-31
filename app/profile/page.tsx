"use client";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostsList from "@/components/PostsList";
import FollowersList from "@/components/FollowersList";
import FollowingList from "@/components/FollowingList";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/Firebase";
import { useRouter } from "next/navigation";
import { getFollowers, getFollowing } from "@/lib/user";
import { doc, getDoc } from "firebase/firestore";
import { getUserTweets } from "@/lib/tweets";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

function stylesBasedOnChoice(intent: string, choice: string) {
  if (choice === intent) {
    return "text-pink-600 font-semibold border-b-4 border-b-pink-600";
  } else return "text-gray-700";
}

const ProfilePage = () => {
  const [choice, setChoice] = React.useState("posts");
  const [user, setUser] = React.useState<User | null>(null);
  const [followers, setFollowers] = React.useState<User[]>([]);
  const [following, setFollowing] = React.useState<User[]>([]);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { push } = useRouter();

  React.useEffect(() => {
    async function collectiveDataFetch(uid: string, email: string) {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data() as User);
      const followerList = await getFollowers(email);
      const followingList = await getFollowing(uid);
      const postList = await getUserTweets(email);
      setFollowing(followingList);
      setFollowers(followerList);
      setPosts(postList);
    }
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // ...
        collectiveDataFetch(user.uid, user.email || "").then((_) => {
          setLoading(false);
        });
      } else {
        // User is signed out
        // ...
        push("/login");
      }
    });
  }, [push]);

  return (
    <div className="w-full lg:w-4/5 lg:mx-auto">
      {/* header */}
      {!loading ? (
        <div>
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
              <div className="flex justify-between w-full items-center">
                <div>
                  <p className="font-semibold">{user?.username}</p>
                  <p className="text-sm text-gray-400">
                    Joined on {new Date(user?.timestamp || "").toDateString()}
                  </p>
                </div>

                <Link href={"/edit-profile"}>
                  <Button className="border border-pink-600 bg-white text-pink-600 hover:bg-pink-600 hover:text-white">
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-between w-4/5 mx-auto text-sm mt-5">
              <div
                className={`${stylesBasedOnChoice(
                  "posts",
                  choice
                )} flex flex-col items-center cursor-pointer`}
                onClick={() => setChoice("posts")}
              >
                <p>{posts.length}</p>
                <p>Posts</p>
              </div>
              <div
                className={`${stylesBasedOnChoice(
                  "followers",
                  choice
                )} flex flex-col items-center cursor-pointer`}
                onClick={() => setChoice("followers")}
              >
                <p>{followers.length}</p>
                <p>Followers</p>
              </div>
              <div
                className={`${stylesBasedOnChoice(
                  "following",
                  choice
                )} flex flex-col items-center cursor-pointer`}
                onClick={() => setChoice("following")}
              >
                <p>{following.length}</p>
                <p>Following</p>
              </div>
            </div>
          </div>

          <div>
            {choice === "following" ? (
              <FollowingList list={following} />
            ) : choice === "followers" ? (
              <FollowersList list={followers} />
            ) : (
              <PostsList list={posts} user={user as User} />
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Loader isLoading={loading} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
