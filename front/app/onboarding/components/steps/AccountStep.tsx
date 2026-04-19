"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema, AccountFormInput } from "@/src/accounts/schemas/account.schema";
import { ACCOUNT_TYPE_LABELS, AccountType } from "@/src/accounts/types/accounts.types";
import { accountsService } from "@/src/accounts/services/accountsService";
import { IAccount } from "@/src/accounts/types/accounts.types";

const ACCOUNT_TYPES = Object.keys(ACCOUNT_TYPE_LABELS) as AccountType[];

const ACCOUNT_TYPE_ICONS: Record<AccountType, string> = {
  CASH: "💵",
  BANK: "🏦",
  CREDIT_CARD: "💳",
  SAVINGS: "🏧",
  INVESTMENT: "📈",
  DIGITAL_WALLET: "📱",
};

interface AccountStepProps {
  onNext: (account: IAccount) => void;
}

export default function AccountStep({ onNext }: AccountStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AccountFormInput>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "BANK",
      balance: 0,
      color: "",
    },
  });

  const selectedType = watch("type");

  const onSubmit = async (data: AccountFormInput) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const response = await accountsService.createAccount({
        name: data.name,
        type: data.type,
        balance: data.balance,
        color: data.color || undefined,
      });
      onNext(response.account);
    } catch {
      setApiError("No se pudo crear la cuenta. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-hard-gray">Tu primera cuenta</h2>
        <p className="text-gray-400 text-sm">
          Agrega la cuenta principal desde la que manejas tu dinero.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Tipo de cuenta — visual selector */}
        <div className="flex flex-col gap-2">
          <label className="text-hard-gray font-semibold text-sm">Tipo de cuenta *</label>
          <div className="grid grid-cols-3 gap-2">
            {ACCOUNT_TYPES.map((type) => (
              <label
                key={type}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 cursor-pointer transition-colors text-center ${
                  selectedType === type
                    ? "border-primary-purple bg-primary-purple/10"
                    : "border-gray-700 hover:border-gray-500"
                }`}
              >
                <input
                  type="radio"
                  value={type}
                  {...register("type")}
                  className="sr-only"
                />
                <span className="text-2xl">{ACCOUNT_TYPE_ICONS[type]}</span>
                <span className="text-xs text-gray-300">{ACCOUNT_TYPE_LABELS[type]}</span>
              </label>
            ))}
          </div>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>

        {/* Nombre */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-hard-gray font-semibold text-sm">
            Nombre de la cuenta *
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="input text-hard-gray"
            disabled={isLoading}
            placeholder={`Ej: ${selectedType === "BANK" ? "Bancolombia" : selectedType === "CASH" ? "Efectivo" : "Mi cuenta"}`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Saldo */}
        <div className="flex flex-col gap-1">
          <label htmlFor="balance" className="text-hard-gray font-semibold text-sm">
            Saldo actual *
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
          <p className="text-gray-500 text-xs">
            Puedes dejarlo en 0 y ajustarlo después.
          </p>
          {errors.balance && (
            <p className="text-red-500 text-sm">{errors.balance.message}</p>
          )}
        </div>

        {apiError && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm">
            {apiError}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded bg-primary-purple text-white font-semibold hover:bg-primary-purple-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creando cuenta..." : "Crear cuenta y continuar"}
        </button>
      </form>
    </div>
  );
}
