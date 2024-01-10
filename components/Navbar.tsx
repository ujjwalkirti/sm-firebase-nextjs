import { BadgeInfo, CircleUserRound, LogOut, Menu, Search } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const Navbar = () => {
  const optionsStyle = "flex  items-center gap-4 text-gray-600";
  return (
    <div className="flex items-center justify-between px-4 pt-8 text-gray-600">
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
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-semibold">William Franklin</p>
                  <p className="text-sm text-gray-400">abc@gmail.com</p>
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
            <p className={optionsStyle}>
              <LogOut />
              Sign Out
            </p>
          </div>
        </SheetContent>
      </Sheet>
      <p className="font-semibold text-black">My Feed</p>
      <Search />
    </div>
  );
};

export default Navbar;
