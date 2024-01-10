"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const SignupPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      {/* header */}
      <div className="flex w-full items-center justify-between mb-16">
        <Link href="/" className="text-pink-600">
          <MoveLeftIcon className="w-[20px]" />
        </Link>
        <h1 className="w-full text-center text-2xl">Create Account</h1>
      </div>

      <form className="w-full flex flex-col gap-5">
        <p className="mb-5 text-xs text-gray-700">
          Fill in the required details and click Proceed.
          <br /> Fields marked * are mandatory
        </p>

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
        <div>
          <Input
            type="password"
            required
            placeholder="Confirm Password"
            className="outline-none"
            onChange={(e) => {
              if (e.target.value !== password) {
                setError("Passwords do not match!");
              } else {
                setError(null);
              }
            }}
          />
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}{" "}
        </div>
        <div className="text-sm text-gray-700">
          By Creating Account, you are automatically accepting all the{" "}
          <Link className="text-pink-600 underline" href={"#"}>
            Terms and Conditions
          </Link>{" "}
          related to Memento.
        </div>
        <Button className="bg-pink-600" type="submit">
          Sign In
        </Button>
      </form>


    </div>
  );
};

export default SignupPage;
