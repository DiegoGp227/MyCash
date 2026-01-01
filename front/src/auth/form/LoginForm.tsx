"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../shemas/auth.shemas";
import { SendHorizontal } from "lucide-react";
import { ICredentials } from "../types/auth.types";

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      <label htmlFor="email">Email:*</label>
      <input type="text" id="email" {...register("email")} className="input" />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <label htmlFor="password">Password:*</label>
      <input
        type="password"
        id="email"
        {...register("password")}
        className="input"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <button
        type="submit"
        className="flex border-2 border-primary-purple hover:border-primary-purple-hover justify-center items-center py-2 px-2.5 rounded mt-2 hover:bg-main-purple gap-1"
      >
        <span>Send</span>
        <SendHorizontal color="#ffffff" />
      </button>
    </form>
  );
}
