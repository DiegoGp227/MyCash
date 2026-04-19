"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transferSchema, TransferFormInput } from "@/src/transfers/schemas/transfer.schema";
import { useAccounts } from "@/src/accounts/hooks/useAccounts";
import type { ITransfer } from "@/src/transfers/types/transfers.types";
import { ArrowRight } from "lucide-react";

interface TransferFormProps {
  onSubmit: (data: TransferFormInput) => void;
  onCancel: () => void;
  transfer?: ITransfer | null;
  isLoading?: boolean;
  submitLabel: string;
}

const today = () => new Date().toISOString().split("T")[0];

export default function TransferForm({
  onSubmit,
  onCancel,
  transfer,
  isLoading,
  submitLabel,
}: TransferFormProps) {
  const { accounts, fetchAccounts } = useAccounts();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TransferFormInput>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      fromAccountId: transfer?.fromAccountId ?? "",
      toAccountId: transfer?.toAccountId ?? "",
      amount: transfer?.amount,
      description: transfer?.description ?? "",
      date: transfer?.date
        ? new Date(transfer.date).toISOString().split("T")[0]
        : today(),
    },
  });

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const fromId = watch("fromAccountId");
  const toId = watch("toAccountId");

  const fromAccount = accounts.find((a) => a.id === fromId);
  const toAccount = accounts.find((a) => a.id === toId);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

      {/* Preview visual de la transferencia */}
      {fromAccount && toAccount && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-purple/5 border border-primary-purple/20">
          <span className="text-sm font-semibold text-light-text-main dark:text-dark-text-main truncate flex-1 text-right">
            {fromAccount.name}
          </span>
          <ArrowRight size={18} className="text-primary-purple shrink-0" />
          <span className="text-sm font-semibold text-light-text-main dark:text-dark-text-main truncate flex-1">
            {toAccount.name}
          </span>
        </div>
      )}

      {/* Cuenta origen */}
      <div className="flex flex-col gap-1">
        <label htmlFor="fromAccountId" className="text-hard-gray font-semibold text-sm">
          Cuenta origen *
        </label>
        <select
          id="fromAccountId"
          {...register("fromAccountId")}
          className="input text-hard-gray"
          disabled={isLoading || accounts.length === 0}
        >
          <option value="">
            {accounts.length === 0 ? "No hay cuentas" : "Selecciona cuenta de origen"}
          </option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id} disabled={acc.id === toId}>
              {acc.name}
            </option>
          ))}
        </select>
        {errors.fromAccountId && (
          <p className="text-red-500 text-sm">{errors.fromAccountId.message}</p>
        )}
      </div>

      {/* Cuenta destino */}
      <div className="flex flex-col gap-1">
        <label htmlFor="toAccountId" className="text-hard-gray font-semibold text-sm">
          Cuenta destino *
        </label>
        <select
          id="toAccountId"
          {...register("toAccountId")}
          className="input text-hard-gray"
          disabled={isLoading || accounts.length === 0}
        >
          <option value="">
            {accounts.length === 0 ? "No hay cuentas" : "Selecciona cuenta de destino"}
          </option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id} disabled={acc.id === fromId}>
              {acc.name}
            </option>
          ))}
        </select>
        {errors.toAccountId && (
          <p className="text-red-500 text-sm">{errors.toAccountId.message}</p>
        )}
      </div>

      {/* Monto */}
      <div className="flex flex-col gap-1">
        <label htmlFor="amount" className="text-hard-gray font-semibold text-sm">
          Monto *
        </label>
        <input
          type="number"
          id="amount"
          step="0.01"
          min="0"
          {...register("amount", { valueAsNumber: true })}
          className="input text-hard-gray"
          disabled={isLoading}
          placeholder="0.00"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}
      </div>

      {/* Fecha */}
      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-hard-gray font-semibold text-sm">
          Fecha *
        </label>
        <input
          type="date"
          id="date"
          {...register("date")}
          className="input text-hard-gray"
          disabled={isLoading}
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-hard-gray font-semibold text-sm">
          Descripción{" "}
          <span className="text-xs font-normal text-hard-gray">(opcional)</span>
        </label>
        <input
          type="text"
          id="description"
          {...register("description")}
          className="input text-hard-gray"
          disabled={isLoading}
          placeholder="Ej: Ahorro mensual"
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
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-2 rounded bg-primary-purple text-white cursor-pointer font-semibold hover:bg-primary-purple-hover transition-colors disabled:opacity-50"
        >
          {isLoading ? "Guardando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
