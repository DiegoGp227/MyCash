"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, LoginInput } from "../shemas/auth.shemas";
import { Eye, EyeClosed, SendHorizontal, Zap } from "lucide-react";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";

export default function LoginForm() {
  const { error: apiError, isLoading, login } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

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

  const handleDemoLogin = async () => {
    await login({ email: "demo@mycash.app", password: "Demo1234!" });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      {/* EMAIL */}
      <label htmlFor="email" className="text-light-text-secondary dark:text-hard-gray">
        Email:*
      </label>
      <input
        type="email"
        id="email"
        {...register("email")}
        className="input text-light-text-main dark:text-hard-gray"
        disabled={isLoading}
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      {/* PASSWORD */}
      <label htmlFor="password" className="text-light-text-secondary dark:text-hard-gray">
        Password:*
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          {...register("password")}
          className="input text-light-text-main dark:text-hard-gray pr-10 w-full"
          disabled={isLoading}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center p-1 hover:bg-primary-purple/10 rounded transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <Eye color="#9333ea" size={20} />
          ) : (
            <EyeClosed color="#9333ea" size={20} />
          )}
        </button>
      </div>

      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      {/* API ERROR */}
      {apiError && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm">
          {apiError}
        </div>
      )}

      {/* SUBMIT */}
      <button
        type="submit"
        className="flex bg-primary-purple hover:bg-primary-purple-hover border-2 border-primary-purple hover:border-primary-purple-hover justify-center items-center py-2 px-2.5 rounded mt-2 gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <span className="text-white font-semibold">
          {isLoading ? "Loading..." : "Send"}
        </span>
        <SendHorizontal className="text-white" size={18} />
      </button>

      <div className="flex items-center gap-2 my-1">
        <div className="flex-1 h-px bg-light-text-secondary/30 dark:bg-hard-gray/30" />
        <span className="text-xs text-light-text-secondary dark:text-hard-gray">o</span>
        <div className="flex-1 h-px bg-light-text-secondary/30 dark:bg-hard-gray/30" />
      </div>

      <button
        type="button"
        onClick={handleDemoLogin}
        disabled={isLoading}
        className="flex border-2 border-primary-purple hover:bg-primary-purple/10 justify-center items-center py-2 px-2.5 rounded gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Zap className="text-primary-purple" size={18} />
        <span className="text-primary-purple font-semibold">
          {isLoading ? "Cargando..." : "Start Demo"}
        </span>
      </button>
    </form>
  );
}
