"use client";

import { X } from "lucide-react";
import Portal from "@/app/categories/components/Atoms/Portal";
import Backdrop from "@/app/categories/components/Atoms/Backdrop";
import AccountForm from "./AccountForm";
import type { AccountFormInput } from "@/src/accounts/schemas/account.schema";
import type { IAccount } from "@/src/accounts/types/accounts.types";

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AccountFormInput) => void;
  mode: "create" | "edit";
  account?: IAccount | null;
  isLoading?: boolean;
}

export default function AccountDrawer({
  isOpen,
  onClose,
  onSubmit,
  mode,
  account,
  isLoading,
}: AccountDrawerProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <Backdrop onClick={onClose} />
      <div
        className="fixed top-0 right-0 h-full w-full md:max-w-md bg-white dark:bg-dark-surface z-50 shadow-xl flex flex-col"
        style={{ animation: "slideInFromRight 0.3s ease-out" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-dark-border sticky top-0 bg-white dark:bg-dark-surface">
          <h2 className="text-xl font-bold dark:text-white">
            {mode === "create" ? "New Account" : "Edit Account"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-bg cursor-pointer transition-colors"
          >
            <X className="dark:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <AccountForm
            onSubmit={onSubmit}
            onCancel={onClose}
            mode={mode}
            defaultValues={
              account
                ? {
                    name: account.name,
                    type: account.type,
                    balance: account.balance,
                    color: account.color ?? "",
                    icon: account.icon ?? "",
                  }
                : undefined
            }
            isLoading={isLoading}
            submitLabel={mode === "create" ? "Create" : "Save"}
          />
        </div>
      </div>
    </Portal>
  );
}
