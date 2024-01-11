"use client";
import FollowersList from "@/components/FollowersList";
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/Firebase";
import { getAllUsers } from "@/lib/user";
import React from "react";

const UsersListPage = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    getAllUsers().then((data) => {
      const allUsers = data as User[];
      const otherUsers = allUsers.filter(
        (user) => user.uid !== auth.currentUser?.uid
      );
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
      <FollowersList list={users} />
    </div>
  );
};

export default UsersListPage;
