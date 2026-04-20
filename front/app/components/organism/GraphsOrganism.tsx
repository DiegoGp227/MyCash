"use client";

import { IncomeVsExpensesChart } from "@/src/home/graphs";
import type { IDashboardSummary } from "@/src/dashboard/types/dashboard.types";

interface GraphsOrganismProps {
  summary: IDashboardSummary | null;
  isLoading: boolean;
}

export default function GraphsOrganism({ summary, isLoading }: GraphsOrganismProps) {
  if (isLoading || !summary) {
    return (
      <div className="h-[360px] rounded-lg border-2 border-primary-purple/30 bg-white dark:bg-dark-surface animate-pulse w-full" />
    );
  }

  const trendData = summary.monthlyTrend.map((p) => ({
    month: p.month,
    ingresos: p.income,
    gastos: p.expenses,
  }));

  const hasTransactions = summary.monthlyTrend.some(
    (p) => p.income > 0 || p.expenses > 0
  );

  if (!hasTransactions) {
    return (
      <div className="rounded-lg border-2 border-primary-purple/40 dark:border-primary-purple bg-white dark:bg-dark-surface p-6 flex items-center justify-center min-h-[200px] w-full shadow-sm">
        <p className="text-hard-gray text-sm text-center">
          Registra transacciones para ver la tendencia de ingresos vs gastos.
        </p>
      </div>
    );
  }

  return <IncomeVsExpensesChart data={trendData} />;
}
