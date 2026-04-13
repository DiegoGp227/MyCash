"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useDashboardStats } from "@/src/dashboard/hooks/useDashboardStats";
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
          <p className="font-semibold dark:text-white">No se pudo cargar el dashboard</p>
          <p className="text-sm text-hard-gray mt-1">{error}</p>
        </div>
        <button
          onClick={fetchSummary}
          className="flex items-center gap-2 px-4 py-2 rounded bg-primary-purple text-white font-semibold hover:bg-primary-purple-hover transition-colors cursor-pointer"
        >
          <RefreshCw size={16} />
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <>
      <GeneralAmount summary={summary} isLoading={isLoading} />
      <GraphsOrganism summary={summary} isLoading={isLoading} />
      <TransactionsOrganism
        transactions={summary?.recentTransactions ?? []}
        isLoading={isLoading}
      />
    </>
  );
}
