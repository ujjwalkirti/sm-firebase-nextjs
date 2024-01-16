"use client";
import Navbar from "@/components/Navbar";
import PostsList from "@/components/PostsList";
import SplashScreenPage from "@/components/SplashScreenPage";
import { ShieldXIcon, SquarePen } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Tweetform from "@/components/Tweetform";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/Firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const Home = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState<boolean>(false);
  const [tweets, setTweets] = React.useState<Post[] | null>([]);
  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        let localUser = {
          username: user.displayName ? user.displayName : user.email || "",
          email: user.email || "",
          uid: user.uid,
          profile_pic_url: user.photoURL || "/assets/avatar.png",
          timestamp: user.metadata.creationTime
            ? user.metadata.creationTime
            : new Date().toDateString(),
        };
        setUser(localUser);
        const userDocRef = doc(db, "users", user.uid);
        getDoc(userDocRef).then((userDocSnapshot) => {
          const following = userDocSnapshot.data()?.following;

          // Add the current user's email to the list of followed users
          following.push(userDocSnapshot.data()?.email);

          // Get the tweets of each followed user from Firestore
          following.map((emailId: string) => {
            const tweetsQuery = query(
              collection(db, "tweets"),
              where("author.email", "==", emailId),
              orderBy("timestamp", "desc")
            );

            onSnapshot(tweetsQuery, (tweetsSnapshot) => {
              const tweets: Post[] = [];
              tweetsSnapshot.forEach((doc) => {
                tweets.push(doc.data() as Post);
              });
              setTweets(tweets);
            });
          });
        });
      } else {
        // User is signed out
        setUser(null);
        setTweets(null);
      }
    });
  }, []);

  return (
    <>
      {user ? (
        <div className="bg-gray-100">
          <Navbar user={user} title={"My Feed"} />
          {tweets ? (
            <PostsList list={tweets} user={user as User} />
          ) : (
            <div className="px-2 mt-10 min-h-screen">
              <ShieldXIcon className="mx-auto text-pink-600 h-14 w-14 mb-5" />
              <p className="text-center">
                Sorry, there was some{" "}
                <span className="text-pink-600 font-bold">error</span> fetching
                the tweets,
                <br /> Please refresh the page.
              </p>
            </div>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <div className="fixed bottom-5 right-5 bg-pink-600 text-white rounded-full h-[40px] w-[40px] flex items-center justify-center shadow-xl">
                <SquarePen />
              </div>
            </DialogTrigger>
            <DialogContent className="w-11/12 mx-auto">
              <DialogHeader className="flex items-center">
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <Tweetform user={user} />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <SplashScreenPage />
      )}
    </>
  );
};

export default Home;
