"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, TransactionFormInput } from "@/src/transactions/schemas/transaction.schema";
import { useAccounts } from "@/src/accounts/hooks/useAccounts";
import { useCategories } from "@/src/categories/hooks/useCategories";
import type { ITransaction } from "@/src/transactions/types/transactions.types";

interface TransactionFormProps {
  onSubmit: (data: TransactionFormInput) => void;
  onCancel: () => void;
  defaultValues?: Partial<TransactionFormInput>;
  transaction?: ITransaction | null;
  isLoading?: boolean;
  submitLabel: string;
}

const today = () => new Date().toISOString().split("T")[0];

export default function TransactionForm({
  onSubmit,
  onCancel,
  defaultValues,
  transaction,
  isLoading,
  submitLabel,
}: TransactionFormProps) {
  const { accounts, fetchAccounts } = useAccounts();
  const { categories, fetchCategories } = useCategories();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TransactionFormInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: defaultValues?.type ?? "EXPENSE",
      amount: defaultValues?.amount,
      accountId: defaultValues?.accountId ?? "",
      categoryId: defaultValues?.categoryId ?? "",
      description: defaultValues?.description ?? "",
      date: defaultValues?.date ?? today(),
    },
  });

  const selectedType = watch("type");

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  useEffect(() => {
    fetchCategories(selectedType);
  }, [fetchCategories, selectedType]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Tipo */}
      <div className="flex flex-col gap-1">
        <label className="text-hard-gray font-semibold">Type *</label>
        <div className="flex rounded overflow-hidden border-2 border-primary-purple">
          {(["EXPENSE", "INCOME"] as const).map((t) => (
            <label
              key={t}
              className={`flex-1 py-2 text-center cursor-pointer font-semibold transition-colors text-sm
                ${selectedType === t
                  ? t === "EXPENSE"
                    ? "bg-error text-white"
                    : "bg-green-500 text-white"
                  : "bg-white dark:bg-dark-surface text-hard-gray hover:bg-gray-50 dark:hover:bg-dark-bg"
                }`}
            >
              <input type="radio" {...register("type")} value={t} className="sr-only" />
              {t === "EXPENSE" ? "Expense" : "Income"}
            </label>
          ))}
        </div>
        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
      </div>

      {/* Monto */}
      <div className="flex flex-col gap-1">
        <label htmlFor="amount" className="text-hard-gray font-semibold">Amount *</label>
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
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
      </div>

      {/* Fecha */}
      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-hard-gray font-semibold">Date *</label>
        <input
          type="date"
          id="date"
          {...register("date")}
          className="input text-hard-gray"
          disabled={isLoading}
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
      </div>

      {/* Cuenta */}
      <div className="flex flex-col gap-1">
        <label htmlFor="accountId" className="text-hard-gray font-semibold">Account *</label>
        <select
          id="accountId"
          {...register("accountId")}
          className="input text-hard-gray"
          disabled={isLoading || accounts.length === 0}
        >
          <option value="">
            {accounts.length === 0 ? "No accounts registered" : "Select an account"}
          </option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name}
            </option>
          ))}
        </select>
        {errors.accountId && <p className="text-red-500 text-sm">{errors.accountId.message}</p>}
      </div>

      {/* Categoría */}
      <div className="flex flex-col gap-1">
        <label htmlFor="categoryId" className="text-hard-gray font-semibold">
          Category <span className="text-xs font-normal text-hard-gray">(optional)</span>
        </label>
        <select
          id="categoryId"
          {...register("categoryId")}
          className="input text-hard-gray"
          disabled={isLoading}
        >
          <option value="">No category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-hard-gray font-semibold">
          Description <span className="text-xs font-normal text-hard-gray">(optional)</span>
        </label>
        <input
          type="text"
          id="description"
          {...register("description")}
          className="input text-hard-gray"
          disabled={isLoading}
          placeholder="E.g.: Utility bill"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
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
