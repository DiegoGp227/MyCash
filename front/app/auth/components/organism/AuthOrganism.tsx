"use client";

import LoginForm from "@/src/auth/form/LoginForm";
import { useState } from "react";
import ButtonChangeAuth from "../atoms/ButtonChangeAuth";
import SignUpForm from "@/src/auth/form/SignUpForm";

export default function AuthOrganism() {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);

  const toggleAuthMode = () => setIsLoginMode((prev) => !prev);

  return (
    <div
      className="flex justify-center items-center min-h-screen py-5"
      style={{
        backgroundImage: "url('/backgrown.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="border-2 border-primary-purple w-full max-w-96 p-5 items-center flex-col flex rounded m-5 gap-5 bg-black">
        <h1 className="text-4xl font-bold text-hard-gray">
          {isLoginMode ? "LOGIN" : "SIGN UP"}
        </h1>
        {isLoginMode ? <LoginForm /> : <SignUpForm />}

        <ButtonChangeAuth login={isLoginMode} onClick={toggleAuthMode} />
      </div>
    </div>
  );
}
