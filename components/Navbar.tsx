import { BadgeInfo, CircleUserRound, LogOut, Menu, Search } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/Firebase";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

type props = {
  title: string;
  user: User;
};

function styleBasedOnCurrentRoute(currentRoute: string, route: string) {
  if (currentRoute === route) {
    return "text-pink-600 font-bold hover:underline";
  } else {
    return "text-gray-400 font-semibold hover:underline";
  }
}

const Navbar = ({ title, user }: props) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const optionsStyle = "flex  items-center gap-4 text-gray-600";
  return (
    <div className="bg-white shadow-lg">
      <div className="flex items-center justify-between px-4 pt-8 text-gray-600 lg:hidden">
        <Sheet>
          <SheetTrigger>
            {" "}
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <div className="flex items-center gap-5">
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src="/assets/avatar.png" alt="User's avatar" />
                    <AvatarFallback>{user.email}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-10 items-start mt-10 justify-between">
              <Link href={"/profile"} className={optionsStyle}>
                {" "}
                <CircleUserRound />
                Profile
              </Link>
              <Link href={"/users"} className={optionsStyle}>
                <BadgeInfo /> User List
              </Link>
              <p
                className={optionsStyle}
                onClick={() => {
                  signOut(auth)
                    .then(() => {
                      // Sign-out successful.
                      push("/login");
                    })
                    .catch((error) => {
                      // An error happened.
                    });
                }}
              >
                <LogOut />
                Sign Out
              </p>
            </div>
          </SheetContent>
        </Sheet>
        <p className="font-semibold text-black">{title}</p>
        <Search />
      </div>
      <div className="hidden lg:flex lg:items-center lg:w-4/5 lg:mx-auto lg:justify-between lg:py-2">
        <p className="text-pink-600 font-bold text-[30px]">TweetX</p>
        <div className="flex gap-4 items-center">
          <Link href={"/"} className={styleBasedOnCurrentRoute(pathname, "/")}>
            Feed
          </Link>
          <Link
            href={"/users"}
            className={styleBasedOnCurrentRoute(pathname, "/users")}
          >
            Users
          </Link>
          <Link
            className={styleBasedOnCurrentRoute(pathname, "/profile")}
            href={"/profile"}
          >
            Profile
          </Link>
          <Button
            className={
              "bg-pink-600 hover:bg-white border border-pink-600 hover:text-pink-600 h-[40px]"
            }
            onClick={() => {
              signOut(auth)
                .then(() => {
                  // Sign-out successful.
                  push("/login");
                })
                .catch((error) => {
                  // An error happened.
                });
            }}
          >
            <LogOut />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
