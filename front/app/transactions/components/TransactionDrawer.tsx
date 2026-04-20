"use client";

import { X } from "lucide-react";
import Portal from "@/app/categories/components/Atoms/Portal";
import Backdrop from "@/app/categories/components/Atoms/Backdrop";
import TransactionForm from "./TransactionForm";
import type { TransactionFormInput } from "@/src/transactions/schemas/transaction.schema";
import type { ITransaction } from "@/src/transactions/types/transactions.types";

interface TransactionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TransactionFormInput) => void;
  mode: "create" | "edit";
  transaction?: ITransaction | null;
  isLoading?: boolean;
}

export default function TransactionDrawer({
  isOpen,
  onClose,
  onSubmit,
  mode,
  transaction,
  isLoading,
}: TransactionDrawerProps) {
  if (!isOpen) return null;

  const defaultValues: Partial<TransactionFormInput> | undefined = transaction
    ? {
        type: transaction.type,
        amount: transaction.amount,
        accountId: transaction.accountId,
        categoryId: transaction.categoryId ?? "",
        description: transaction.description ?? "",
        date: transaction.date.split("T")[0],
      }
    : undefined;

  return (
    <Portal>
      <Backdrop onClick={onClose} />
      <div
        className="fixed top-0 right-0 h-full w-full md:max-w-md bg-white dark:bg-dark-surface z-50 shadow-xl flex flex-col"
        style={{ animation: "slideInFromRight 0.3s ease-out" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-dark-border sticky top-0 bg-white dark:bg-dark-surface">
          <h2 className="text-xl font-bold dark:text-white">
            {mode === "create" ? "New Transaction" : "Edit Transaction"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-bg cursor-pointer transition-colors"
          >
            <X className="dark:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <TransactionForm
            onSubmit={onSubmit}
            onCancel={onClose}
            defaultValues={defaultValues}
            transaction={transaction}
            isLoading={isLoading}
            submitLabel={mode === "create" ? "Create" : "Save"}
          />
        </div>
      </div>
    </Portal>
  );
}
