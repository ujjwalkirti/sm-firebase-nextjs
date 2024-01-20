"use client";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { auth, db, storage } from "@/lib/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { CheckCircleIcon, UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const EditProfilePage = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [dataUpdateStatus, setIsDataUpdateStatus] =
    React.useState<string>("not-started");
  const [progress, setProgress] = React.useState<number>(0);
  const [file, setFile] = React.useState<File | null>(null);
  const { push } = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setUser({ ...(docSnap.data() as User), uid: user.uid });
      } else {
        push("/login");
      }
    });
  }, [push]);

  const updateUserDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setIsDataUpdateStatus("not-started");
      return;
    }
    if (!file.type.startsWith("image/")) {
      console.log("not image", file.type.startsWith("image/"));
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "File is not an image. Please upload an image file.",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              setIsDataUpdateStatus("not-started");
            }}
          >
            Try again
          </ToastAction>
        ),
      });
      return;
    }

    const fileName = `avatar/${user?.username}_${file.name}`;
    const avatarRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(avatarRef, file);
    setIsDataUpdateStatus("upload-running");

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            setIsDataUpdateStatus("upload-paused");
            break;
          case "running":
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            setIsDataUpdateStatus("unauthorized-storage");
            break;
          case "storage/canceled":
            setIsDataUpdateStatus("canceled-storage");
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            setIsDataUpdateStatus("unknown-storage");
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          if (user) {
            console.log(user);
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
              username: user.username,
              profile_pic_url: downloadURL,
            });
            setIsDataUpdateStatus("updated-successfully");
          }
        });
      }
    );
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "No file selected.",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              setIsDataUpdateStatus("not-started");
            }}
          >
            Try again
          </ToastAction>
        ),
      });
    }
  };

  if (!user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader isLoading={!user ? true : false} />
      </div>
    );
  }
  return (
    <div>
      <Navbar title="Edit Your Profile" user={user} />
      {dataUpdateStatus === "not-started" && (
        <form
          className="mt-10 flex flex-col items-center gap-4  w-full sm:w-4/5 md:w-3/5 lg:w-2/5 mx-auto"
          onSubmit={updateUserDetails}
        >
          <div className="flex flex-col md:flex-row items-center gap-3">
            <Avatar className="w-[80px] h-[80px]">
              <AvatarImage src={user?.profile_pic_url} alt="User's avatar" />
              <AvatarFallback>{user?.email}</AvatarFallback>
            </Avatar>
            <label
              className="border-2 rounded-md p-4 border-dashed border-pink-600 flex flex-col items-center gap-2 cursor-pointer"
              htmlFor="profile-picture"
            >
              {" "}
              <UploadIcon className="text-pink-600" />
              Click to upload the image
            </label>
            <input
              type="file"
              name="profile picture"
              id="profile-picture"
              onChange={handleFileSelected}
              className="hidden"
            />
          </div>
          <Input
            type="text"
            name="username"
            required
            className="w-4/5 mx-auto"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
          />
          {/* <input type="email" name="email" id="" /> */}

          <Button
            type="submit"
            className="bg-pink-600 hover:bg-pink-600 hover:shadow mb-4"
          >
            Submit
          </Button>
        </form>
      )}
      {(dataUpdateStatus === "upload-running" ||
        dataUpdateStatus === "upload-paused") &&
        progress !== 0 && (
          <div className="p-3 w-3/5 flex flex-col items-center gap-4 mx-auto mt-10 text-pink-600">
            <Progress value={progress} className="" color="#DB2777" />
            {dataUpdateStatus === "upload-running" && (
              <p>Uploading the image!</p>
            )}
            {dataUpdateStatus === "upload-paused" && <p>Upload is paused!</p>}
          </div>
        )}
      {dataUpdateStatus === "updated-successfully" && (
        <div className="p-3 w-3/5 flex flex-col items-center gap-4 mx-auto mt-10 text-pink-600">
          <CheckCircleIcon />
          <p>Profile updated successfully!</p>
        </div>
      )}
    </div>
  );
};

EditProfilePage.displayName = "EditProfilePage";
export default React.memo(EditProfilePage);
