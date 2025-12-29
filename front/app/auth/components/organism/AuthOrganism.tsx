"use client";

import LoginForm from "@/src/auth/form/LoginForm";
import { useState } from "react";
import ButtonChangeAuth from "../atoms/ButtonChangeAuth";

export default function AuthOrganism() {
  const [login, setLogin] = useState<boolean>(true);

  function changeForm() {
    if (login) {
      setLogin(false);
      console.log(login);
    } else {
      setLogin(true);
      console.log(login);
    }
  }
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: "url('/backgrown.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="border-2 border-primary-purple w-full max-w-96 h-100 p-5 items-center flex-col flex rounded m-5 gap-5 bg-black">
        <h1 className="text-4xl font-bold text-hard-gray">
          {login ? "LOGIN" : "SIGN UP"}
        </h1>
        {login ? (
          <LoginForm onSubmit={() => {}} />
        ) : (
          <LoginForm onSubmit={() => {}} />
        )}

        <ButtonChangeAuth login={login} onClick={changeForm} />
      </div>
    </div>
  );
}
