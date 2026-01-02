"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, LoginInput } from "../shemas/auth.shemas";
import { SendHorizontal } from "lucide-react";
import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
  const { error: apiError, isLoading, login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      <label htmlFor="email" className="text-hard-gray">
        Email:*
      </label>
      <input
        type="text"
        id="email"
        {...register("email")}
        className="input text-hard-gray"
        disabled={isLoading}
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <label htmlFor="password" className="text-hard-gray">
        Password:*
      </label>
      <input
        type="password"
        id="password"
        {...register("password")}
        className="input text-hard-gray"
        disabled={isLoading}
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      {apiError && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm">
          {apiError}
        </div>
      )}

      <button
        type="submit"
        className="flex border-2 border-primary-purple hover:border-primary-purple-hover justify-center items-center py-2 px-2.5 rounded mt-2 hover:bg-main-purple gap-1"
        disabled={isLoading}
      >
        <span className="text-hard-gray">Send</span>
        <SendHorizontal color="#ffffff" />
      </button>
    </form>
  );
}
