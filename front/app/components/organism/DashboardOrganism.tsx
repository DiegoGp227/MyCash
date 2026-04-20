"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useDashboardStats } from "@/src/dashboard/hooks/useDashboardStats";
import { ExpensesByCategoryChart } from "@/src/home/graphs";
import GeneralAmount from "../molecules/GeneralAmount";
import GraphsOrganism from "./GraphsOrganism";
import TransactionsOrganism from "./TransactionsOrganism";

export default function DashboardOrganism() {
  const { summary, isLoading, error, fetchSummary } = useDashboardStats();

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  if (error && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <AlertTriangle size={28} className="text-error" />
        </div>
        <div>
          <p className="font-semibold dark:text-white">Could not load the dashboard</p>
          <p className="text-sm text-hard-gray mt-1">{error}</p>
        </div>
        <button
          onClick={fetchSummary}
          className="flex items-center gap-2 px-4 py-2 rounded bg-primary-purple text-white font-semibold hover:bg-primary-purple-hover transition-colors cursor-pointer"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  const hasCategoryData = (summary?.expensesByCategory?.length ?? 0) > 0;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Fila 1: 4 stat cards */}
      <GeneralAmount summary={summary} isLoading={isLoading} />

      {/* Fila 2: Ingresos vs Gastos — full width */}
      <GraphsOrganism summary={summary} isLoading={isLoading} />

      {/* Fila 3: Gastos por Categoría + Transacciones Recientes — 50/50 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading || !summary ? (
          <>
            <div className="h-[360px] rounded-lg border-2 border-primary-purple/30 bg-white dark:bg-dark-surface animate-pulse" />
            <div className="h-[360px] rounded-lg border-2 border-primary-purple/30 bg-white dark:bg-dark-surface animate-pulse" />
          </>
        ) : (
          <>
            {hasCategoryData ? (
              <ExpensesByCategoryChart
                data={summary.expensesByCategory as Parameters<typeof ExpensesByCategoryChart>[0]["data"]}
              />
            ) : (
              <div className="rounded-lg border-2 border-primary-purple/40 dark:border-primary-purple bg-white dark:bg-dark-surface p-6 flex items-center justify-center min-h-[200px] shadow-sm">
                <p className="text-hard-gray text-sm text-center">
                  No categorized expenses this month.
                </p>
              </div>
            )}
            <TransactionsOrganism
              transactions={summary.recentTransactions}
              isLoading={false}
            />
          </>
        )}
      </div>
    </div>
  );
}
