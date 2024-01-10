"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { push } = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6">
      {/* header */}
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="text-pink-600">
          <MoveLeftIcon className="w-[20px]" />
        </Link>
        <h1 className="w-full text-center text-2xl">Login</h1>
      </div>

      <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
        <p className="mb-5">Type in your Email ID and Password!</p>

        <Input
          type="email"
          required
          placeholder="Email ID"
          className="outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          required
          placeholder="Password"
          className="outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="bg-pink-600" type="submit">
          Sign In
        </Button>
      </form>

      <Link className="text-pink-600" href="#">
        Can&apos;t Sign In? Reset Password
      </Link>
    </div>
  );
};

export default LoginPage;
