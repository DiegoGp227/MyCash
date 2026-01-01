"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "../shemas/auth.shemas";
import { SendHorizontal } from "lucide-react";
import { ICredentials } from "../types/auth.types";

interface ILoginProps {
  onSubmit: (data: ICredentials) => void;
  apiError?: string | null;
  isLoading?: boolean;
}

export default function SignUpForm({
  onSubmit,
  apiError,
  isLoading,
}: ILoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
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
        id="password"
        {...register("password")}
        className="input"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <label htmlFor="confirmPassword">Confirm Password:*</label>
      <input
        type="password"
        id="confirmPassword"
        {...register("confirmPassword")}
        className="input"
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
      )}

      <label htmlFor="name">Name:*</label>
      <input type="text" id="name" {...register("name")} className="input" />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <label htmlFor="userName">UserName:*</label>
      <input
        type="text"
        id="userName"
        {...register("username")}
        className="input"
      />
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username.message}</p>
      )}

      <label htmlFor="cutoffDay">Cut Off Day:*</label>
      <input
        type="number"
        id="cutoffDay"
        {...register("cutoffDay", { valueAsNumber: true })}
        className="input"
        min="1"
        max="31"
        placeholder="1-31"
      />
      {errors.cutoffDay && (
        <p className="text-red-500 text-sm">{errors.cutoffDay.message}</p>
      )}

      <label htmlFor="currency">Currency:*</label>
      <select
        id="currency"
        {...register("currency")}
        className="input bg-black cursor-pointer hover:border-primary-purple-hover transition-all"
        defaultValue=""
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

      <button
        type="submit"
        className="flex border-2 border-primary-purple hover:border-primary-purple-hover justify-center items-center py-2 px-2.5 rounded mt-2 hover:bg-main-purple gap-1"
        disabled={isLoading}
      >
        <span>Send</span>
        <SendHorizontal color="#ffffff" />
      </button>

      {apiError && (
        <div className="w-87.5 bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm">
          {apiError}
        </div>
      )}
    </form>
  );
}
