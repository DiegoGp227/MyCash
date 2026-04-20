"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema, AccountFormInput } from "@/src/accounts/schemas/account.schema";
import { ACCOUNT_TYPE_LABELS, AccountType } from "@/src/accounts/types/accounts.types";
import ColorPicker from "@/app/categories/components/Atoms/ColorPicker";

const ACCOUNT_TYPES = Object.keys(ACCOUNT_TYPE_LABELS) as AccountType[];

interface AccountFormProps {
  onSubmit: (data: AccountFormInput) => void;
  onCancel: () => void;
  defaultValues?: Partial<AccountFormInput>;
  isLoading?: boolean;
  submitLabel: string;
  mode: "create" | "edit";
}

export default function AccountForm({
  onSubmit,
  onCancel,
  defaultValues,
  isLoading,
  submitLabel,
  mode,
}: AccountFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AccountFormInput>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      type: defaultValues?.type ?? "BANK",
      balance: defaultValues?.balance ?? 0,
      color: defaultValues?.color ?? "",
      icon: defaultValues?.icon ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Nombre */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-hard-gray font-semibold">
          Name *
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="input text-hard-gray"
          disabled={isLoading}
          placeholder="E.g.: Main Checking"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Tipo */}
      <div className="flex flex-col gap-1">
        <label htmlFor="type" className="text-hard-gray font-semibold">
          Type *
        </label>
        <select
          id="type"
          {...register("type")}
          disabled={isLoading || mode === "edit"}
          className="input text-hard-gray"
        >
          {ACCOUNT_TYPES.map((type) => (
            <option key={type} value={type}>
              {ACCOUNT_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm">{errors.type.message}</p>
        )}
      </div>

      {/* Saldo */}
      <div className="flex flex-col gap-1">
        <label htmlFor="balance" className="text-hard-gray font-semibold">
          {mode === "create" ? "Initial balance *" : "Current balance *"}
        </label>
        <input
          type="number"
          id="balance"
          step="0.01"
          {...register("balance", { valueAsNumber: true })}
          className="input text-hard-gray"
          disabled={isLoading}
          placeholder="0.00"
        />
        {errors.balance && (
          <p className="text-red-500 text-sm">{errors.balance.message}</p>
        )}
      </div>

      {/* Color */}
      <div className="flex flex-col gap-1">
        <label className="text-hard-gray font-semibold">Color *</label>
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorPicker
              value={field.value ?? ""}
              onChange={field.onChange}
              error={errors.color?.message}
            />
          )}
        />
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 py-2 rounded border-2 border-primary-purple text-black dark:text-white cursor-pointer font-semibold hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-2 rounded bg-primary-purple text-white cursor-pointer font-semibold hover:bg-primary-purple-hover transition-colors"
        >
          {isLoading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
