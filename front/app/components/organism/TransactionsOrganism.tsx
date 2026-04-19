"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import type { IRecentTransaction } from "@/src/dashboard/types/dashboard.types";

interface TransactionsOrganismProps {
  transactions: IRecentTransaction[];
  isLoading: boolean;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(n);

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
  });

export default function TransactionsOrganism({
  transactions,
  isLoading,
}: TransactionsOrganismProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col rounded-lg border-2 bg-white p-6 shadow-sm dark:bg-black border-primary-purple/40 dark:border-primary-purple gap-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-gray-200 dark:border-dark-border pb-4">
          <p className="text-2xl font-bold text-light-text-main dark:text-white">Transacciones Recientes</p>
          <Link
            href="/transactions"
            className="flex items-center gap-1 text-sm text-primary-purple hover:underline font-semibold"
          >
            Ver todas <ArrowRight size={14} />
          </Link>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 rounded bg-gray-200 dark:bg-dark-surface animate-pulse" />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center py-8 gap-2 text-center">
            <p className="text-hard-gray">No hay transacciones aún.</p>
            <Link href="/transactions" className="text-sm text-primary-purple hover:underline">
              Registra tu primera transacción
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between py-3 hover:bg-primary-purple/5 px-2 rounded transition-colors"
              >
                {/* Left: icon + info */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0
                      ${t.type === "INCOME"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : "bg-red-100 dark:bg-red-900/30"
                      }`}
                  >
                    {t.type === "INCOME"
                      ? <TrendingUp size={16} className="text-green-600 dark:text-green-400" />
                      : <TrendingDown size={16} className="text-red-600 dark:text-red-400" />
                    }
                  </div>
                  <div>
                    <p className="text-sm font-medium text-light-text-main dark:text-white leading-tight">
                      {t.description ?? t.categoryName ?? t.accountName}
                    </p>
                    <p className="text-xs text-hard-gray">
                      {t.accountName}
                      {t.categoryName ? ` · ${t.categoryName}` : ""}
                      {" · "}{fmtDate(t.date)}
                    </p>
                  </div>
                </div>

                {/* Right: amount */}
                <span
                  className={`text-sm font-bold whitespace-nowrap ${
                    t.type === "INCOME"
                      ? "text-green-600 dark:text-green-400"
                      : "text-error"
                  }`}
                >
                  {t.type === "INCOME" ? "+" : "-"}{fmt(t.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
