"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SendHorizontal } from "lucide-react";
import { ICreateUserRequest } from "../types/auth.types";
import { useSignUp } from "../hooks/useSignUp";
import { signupSchema, SignupInput } from "../shemas/auth.shemas";

export default function SignUpForm() {
  const { error: apiError, isLoading, signup } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupInput) => {
    try {
      const { confirmPassword, ...requestData } = data;
      await signup(requestData as ICreateUserRequest);
    } catch (err) {
      console.error("Signup failed:", err);
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
        type="email"
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

      <label htmlFor="confirmPassword" className="text-hard-gray">
        Confirm Password:*
      </label>
      <input
        type="password"
        id="confirmPassword"
        {...register("confirmPassword")}
        className="input text-hard-gray"
        disabled={isLoading}
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
      )}

      <label htmlFor="name" className="text-hard-gray">
        Name:*
      </label>
      <input
        type="text"
        id="name"
        {...register("name")}
        className="input text-hard-gray"
        disabled={isLoading}
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <label htmlFor="username" className="text-hard-gray">
        Username:*
      </label>
      <input
        type="text"
        id="username"
        {...register("username")}
        className="input text-hard-gray"
        disabled={isLoading}
      />
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username.message}</p>
      )}

      <label htmlFor="cutoffDay" className="text-hard-gray">
        Cut Off Day:*
      </label>
      <input
        type="number"
        id="cutoffDay"
        {...register("cutoffDay", { valueAsNumber: true })}
        className="input text-hard-gray"
        min="1"
        max="31"
        placeholder="1-31"
        disabled={isLoading}
      />
      {errors.cutoffDay && (
        <p className="text-red-500 text-sm">{errors.cutoffDay.message}</p>
      )}

      <label htmlFor="currency" className="text-hard-gray">
        Currency:*
      </label>
      <select
        id="currency"
        {...register("currency")}
        className="input bg-black cursor-pointer hover:border-primary-purple-hover transition-all text-hard-gray"
        defaultValue=""
        disabled={isLoading}
      >
        <option value="" disabled className="bg-black text-gray-400">
          Select a currency
        </option>
        <option value="USD" className="bg-black text-primary-purple py-2">
          USD - US Dollar
        </option>
        <option value="EUR" className="bg-black text-primary-purple py-2">
          EUR - Euro
        </option>
        <option value="GBP" className="bg-black text-primary-purple py-2">
          GBP - British Pound
        </option>
        <option value="COP" className="bg-black text-primary-purple py-2">
          COP - Colombian Peso
        </option>
        <option value="MXN" className="bg-black text-primary-purple py-2">
          MXN - Mexican Peso
        </option>
        <option value="BRL" className="bg-black text-primary-purple py-2">
          BRL - Brazilian Real
        </option>
        <option value="ARS" className="bg-black text-primary-purple py-2">
          ARS - Argentine Peso
        </option>
        <option value="CLP" className="bg-black text-primary-purple py-2">
          CLP - Chilean Peso
        </option>
        <option value="PEN" className="bg-black text-primary-purple py-2">
          PEN - Peruvian Sol
        </option>
        <option value="JPY" className="bg-black text-primary-purple py-2">
          JPY - Japanese Yen
        </option>
      </select>
      {errors.currency && (
        <p className="text-red-500 text-sm">{errors.currency.message}</p>
      )}

      {apiError && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm">
          {apiError}
        </div>
      )}

      <button
        type="submit"
        className="flex border-2 border-primary-purple hover:border-primary-purple-hover justify-center items-center py-2 px-2.5 rounded mt-2 hover:bg-main-purple gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <span className="text-hard-gray">
          {isLoading ? "Enviando..." : "Send"}
        </span>
        <SendHorizontal color="#ffffff" />
      </button>
    </form>
  );
}
