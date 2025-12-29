"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, signupSchema } from "../shemas/auth.shemas";
import { SendHorizontal } from "lucide-react";

interface ILoginProps {
  onSubmit: (data: ICredentials) => void;
}

export default function SignUpForm({ onSubmit }: ILoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  //   name      String
  //   username  String?  @unique

  //   cutoffDay Int      @default(1)
  //   currency  String   @default("COP")

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      <label htmlFor="email">Email:*</label>
      <input type="text" id="email" {...register("email")} className="input" />

      <label htmlFor="password">Password:*</label>
      <input
        type="password"
        id="password"
        {...register("password")}
        className="input"
      />

      <label htmlFor="confirmPassword">Confirm Password:*</label>
      <input
        type="password"
        id="confirmPassword"
        {...register("confirmPassword")}
        className="input"
      />

      <label htmlFor="name">Name:*</label>
      <input type="text" id="name" {...register("name")} className="input" />

      <label htmlFor="userName">UserName:*</label>
      <input
        type="password"
        id="userName"
        {...register("username")}
        className="input"
      />

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

        <option value="USD" className="bg-black text-primary-purple py-2">USD - US Dollar</option>
        <option value="EUR" className="bg-black text-primary-purple py-2">EUR - Euro</option>
        <option value="GBP" className="bg-black text-primary-purple py-2">GBP - British Pound</option>
        <option value="COP" className="bg-black text-primary-purple py-2">COP - Colombian Peso</option>
        <option value="MXN" className="bg-black text-primary-purple py-2">MXN - Mexican Peso</option>
        <option value="BRL" className="bg-black text-primary-purple py-2">BRL - Brazilian Real</option>
        <option value="ARS" className="bg-black text-primary-purple py-2">ARS - Argentine Peso</option>
        <option value="CLP" className="bg-black text-primary-purple py-2">CLP - Chilean Peso</option>
        <option value="PEN" className="bg-black text-primary-purple py-2">PEN - Peruvian Sol</option>
        <option value="JPY" className="bg-black text-primary-purple py-2">JPY - Japanese Yen</option>
      </select>

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
