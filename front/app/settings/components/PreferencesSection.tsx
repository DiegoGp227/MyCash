"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SlidersHorizontal } from "lucide-react";
import { preferencesSchema, PreferencesFormInput } from "@/src/auth/schemas/updateUser.schema";
import { useUpdateUser } from "@/src/auth/hooks/useUpdateUser";
import { IUserInfo } from "@/src/auth/types/auth.types";
import { useState } from "react";

const CURRENCIES = [
  { value: "USD", label: "USD — US Dollar" },
  { value: "EUR", label: "EUR — Euro" },
  { value: "GBP", label: "GBP — British Pound" },
  { value: "COP", label: "COP — Colombian Peso" },
  { value: "MXN", label: "MXN — Mexican Peso" },
  { value: "BRL", label: "BRL — Brazilian Real" },
  { value: "ARS", label: "ARS — Argentine Peso" },
  { value: "CLP", label: "CLP — Chilean Peso" },
  { value: "PEN", label: "PEN — Peruvian Sol" },
  { value: "JPY", label: "JPY — Japanese Yen" },
] as const;

interface PreferencesSectionProps {
  user: IUserInfo;
}

export default function PreferencesSection({ user }: PreferencesSectionProps) {
  const { isLoading, updateUser } = useUpdateUser();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PreferencesFormInput>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      currency: user.currency as PreferencesFormInput["currency"],
      cutoffDay: user.cutoffDay,
    },
  });

  const onSubmit = async (data: PreferencesFormInput) => {
    setServerError(null);
    setSuccess(false);
    try {
      await updateUser(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setServerError(err.message);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary-purple/10 dark:bg-primary-purple/20 flex items-center justify-center">
          <SlidersHorizontal className="w-5 h-5 text-primary-purple" />
        </div>
        <div>
          <h2 className="font-semibold text-light-text-main dark:text-white">Preferences</h2>
          <p className="text-sm text-hard-gray">Set your currency and billing cycle</p>
        </div>
      </div>

      <div className="h-px bg-gray-100 dark:bg-dark-border" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-hard-gray">Currency *</label>
          <select {...register("currency")} disabled={isLoading} className="input text-hard-gray">
            {CURRENCIES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.currency && <p className="text-red-500 text-sm">{errors.currency.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-hard-gray">Billing cycle cutoff day *</label>
          <input
            type="number"
            min={1}
            max={31}
            {...register("cutoffDay", { valueAsNumber: true })}
            disabled={isLoading}
            className="input text-hard-gray"
          />
          <p className="text-xs text-hard-gray">
            Day of the month when your billing period starts (1–31).
          </p>
          {errors.cutoffDay && <p className="text-red-500 text-sm">{errors.cutoffDay.message}</p>}
        </div>

        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
        {success && <p className="text-green-500 text-sm">Preferences saved successfully.</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2 rounded-lg bg-primary-purple text-white font-semibold hover:bg-primary-purple-hover transition-colors disabled:opacity-60"
          >
            {isLoading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
