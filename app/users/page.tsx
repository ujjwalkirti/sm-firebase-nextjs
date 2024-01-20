"use client";
import FollowersList from "@/components/FollowersList";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { auth, db } from "@/lib/Firebase";
import { getAllUsers } from "@/lib/user";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React from "react";

type ExtendedUser = User & {
  beingFollowedByCurrentAuthUser: boolean;
};

const UsersListPage = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const { push } = useRouter();
  React.useEffect(() => {
    getAllUsers().then(async (data) => {
      const allUsers = data as ExtendedUser[];

      const otherUsers = allUsers.filter((user: ExtendedUser) => {
        if (user.email === auth.currentUser?.email) {
          return;
        }
        if (currentUser?.following?.indexOf(user.email) === -1) {
          user["beingFollowedByCurrentAuthUser"] = false;
        } else {
          user["beingFollowedByCurrentAuthUser"] = true;
        }
        return user;
      });
      setUsers(otherUsers);
    });
  }, [currentUser?.following]);

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const currentUserSnap = await getDoc(userDocRef);
        if (currentUserSnap.exists()) {
          setCurrentUser(currentUserSnap.data() as User);
        } else {
          let localUser = {
            username: user.displayName ? user.displayName : user.email || "",
            email: user.email || "",
            uid: user.uid,
            profile_pic_url: user.photoURL || "/assets/avatar.png",
            timestamp: user.metadata.creationTime
              ? user.metadata.creationTime
              : new Date().toDateString(),
          };
          setCurrentUser(localUser);
        }
      } else {
        push("/login");
      }
    });
  }, [push]);

  return (
    <div className="">
      {currentUser ? (
        <div className="">
          <Navbar user={currentUser} title={"Users"} />
          <div className="w-full lg:w-3/5 mx-auto">
            <FollowersList list={users} />
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-screen flex items-center justify-center">
          <Loader isLoading={currentUser ? false : true} />
        </div>
      )}
    </div>
  );
};

export default UsersListPage;
