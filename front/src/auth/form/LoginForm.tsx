"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../shemas/auth.shemas";
import { SendHorizontal } from "lucide-react";

interface ILoginProps {
  onSubmit: (data: ICredentials) => void;
}

export default function LoginForm({ onSubmit }: ILoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2">
      <label htmlFor="email">Email:*</label>
      <input type="text" id="email" {...register("email")} className="input" />

      <label htmlFor="email">Email:*</label>
      <input
        type="password"
        id="email"
        {...register("password")}
        className="input"
      />
      <button
        type="submit"
        className="flex border-2 border-primary-purple hover:border-primary-purple-hover justify-center items-center py-2 px-2.5 rounded mt-2 hover:bg-main-purple"
      >
        <span>Send</span>
        <SendHorizontal color="#ffffff" />
      </button>
    </form>
  );
}
