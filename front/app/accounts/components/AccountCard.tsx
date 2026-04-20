"use client";

import { Pencil, Trash2 } from "lucide-react";
import { IAccount, ACCOUNT_TYPE_LABELS } from "@/src/accounts/types/accounts.types";

interface AccountCardProps {
  account: IAccount;
  onEdit: (account: IAccount) => void;
  onDelete: (account: IAccount) => void;
}

const formatBalance = (balance: number, currency = "COP") =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(balance);

export default function AccountCard({ account, onEdit, onDelete }: AccountCardProps) {
  const isNegative = account.balance < 0;

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg border-2 border-primary-purple bg-white dark:bg-dark-surface shadow-sm hover:shadow-md transition-shadow">
      {/* Header: color dot + name + actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {account.color && (
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: account.color }}
            />
          )}
          <span className="font-semibold text-light-text-main dark:text-dark-text-main truncate">
            {account.name}
          </span>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => onEdit(account)}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors cursor-pointer"
            title="Edit"
          >
            <Pencil size={15} className="text-primary-purple" />
          </button>
          <button
            onClick={() => onDelete(account)}
            className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
            title="Delete"
          >
            <Trash2 size={15} className="text-error" />
          </button>
        </div>
      </div>

      {/* Balance */}
      <p
        className={`text-2xl font-bold ${
          isNegative
            ? "text-error"
            : "text-light-text-main dark:text-dark-text-main"
        }`}
      >
        {formatBalance(account.balance)}
      </p>

      {/* Type badge */}
      <span className="self-start text-xs font-medium px-2 py-0.5 rounded-full bg-primary-purple/10 text-primary-purple dark:bg-primary-purple/20 dark:text-primary-purple-light">
        {ACCOUNT_TYPE_LABELS[account.type]}
      </span>
    </div>
  );
}
