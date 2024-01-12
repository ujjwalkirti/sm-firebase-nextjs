import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const SplashScreenPage = () => {
  return (
    <div className="flex flex-col items-center justify-between w-4/5 mx-auto p-2">
      <Image
        src={"/assets/splash-screen-header.jpg"}
        height={250}
        width={250}
        priority
        alt="social media app on phone image"
      />
      <h2 className="text-[50px] text-pink-600 font-[800] mb-3">TweetX</h2>
      <h4 className="text-center text-gray-500 text-xs mx-auto mb-10">
        TweetX is a social app that lets you share your moments with friends
      </h4>
      <div className="flex flex-col items-center gap-20 w-full">
        <Button asChild className="bg-pink-600 w-full md:w-1/5">
          <Link href={"/login"}>Sign In</Link>
        </Button>
        <Link className="text-pink-600 hover:underline" href={"/signup"}>Create New Account</Link>
      </div>

      <div className="fixed bottom-2">2017 Momento Inc.</div>
    </div>
  );
};

export default SplashScreenPage;
