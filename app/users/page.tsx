"use client";
import FollowersList from "@/components/FollowersList";
import Navbar from "@/components/Navbar";
import { auth, db } from "@/lib/Firebase";
import { getAllUsers } from "@/lib/user";
import {doc, getDoc } from "firebase/firestore";
import React from "react";

type ExtendedUser = User & {
  beingFollowedByCurrentAuthUser: boolean;
};

const UsersListPage = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    getAllUsers().then(async (data) => {
      const allUsers = data as ExtendedUser[];
      let currentUser: User;
      const currentUserRef = doc(db, "users", auth.currentUser?.uid as string);
      const currentUserSnap = await getDoc(currentUserRef);
      if (currentUserSnap.exists()) {
        currentUser = currentUserSnap.data() as User;
      }
      const otherUsers = allUsers.filter((user: ExtendedUser) => {
        if (user.email === auth.currentUser?.email) {
          return;
        }
        if (currentUser.following?.indexOf(user.email) === -1) {
          user["beingFollowedByCurrentAuthUser"] = false;
        } else {
          user["beingFollowedByCurrentAuthUser"] = true;
        }
        return user;
      });
      setUsers(otherUsers);
    });
  }, []);
  return (
    <div>
      <Navbar
        user={{
          username: auth.currentUser?.displayName || "",
          profile_pic_url: auth.currentUser?.photoURL || "/assets/avatar.png",
          email: auth.currentUser?.email || "",
          uid: auth.currentUser?.uid || "",
          timestamp: auth.currentUser?.metadata.creationTime || "",
        }}
        title={"Users"}
      />
      <div className="w-full lg:w-3/5 mx-auto">
        <FollowersList list={users} />
      </div>
    </div>
  );
};

export default UsersListPage;
