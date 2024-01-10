"use client";
import Navbar from "@/components/Navbar";
import PostsList from "@/components/PostsList";
import SplashScreenPage from "@/components/SplashScreenPage";
import { posts } from "@/constants/posts";
import { SquarePen, XCircle } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Tweetform from "@/components/Tweetform";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/Firebase";

const Home = () => {
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log(user);
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <>
      {user ? (
        <div className="bg-gray-100">
          <Navbar />
          <PostsList list={posts} />

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
              <Tweetform />
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
