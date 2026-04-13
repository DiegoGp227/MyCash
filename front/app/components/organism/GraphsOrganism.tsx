"use client";

import { IncomeVsExpensesChart, ExpensesByCategoryChart } from "@/src/home/graphs";
import type { IDashboardSummary } from "@/src/dashboard/types/dashboard.types";

interface GraphsOrganismProps {
  summary: IDashboardSummary | null;
  isLoading: boolean;
}

export default function GraphsOrganism({ summary, isLoading }: GraphsOrganismProps) {
  if (isLoading || !summary) {
    return (
      <div className="flex w-full flex-col gap-8 p-6">
        <div className="h-[360px] rounded-lg border-2 border-primary-purple/30 bg-gray-bg dark:bg-black animate-pulse" />
        <div className="h-[360px] rounded-lg border-2 border-primary-purple/30 bg-gray-bg dark:bg-black animate-pulse" />
      </div>
    );
  }

  // Map backend data to chart format
  const trendData = summary.monthlyTrend.map((p) => ({
    month: p.month,
    ingresos: p.income,
    gastos: p.expenses,
  }));

  const hasTransactions =
    summary.monthlyTrend.some((p) => p.income > 0 || p.expenses > 0);

  const hasCategoryData = summary.expensesByCategory.length > 0;

  return (
    <div className="flex w-full flex-col gap-8 p-6">
      {/* Income vs Expenses — last 6 months */}
      {hasTransactions ? (
        <IncomeVsExpensesChart data={trendData} />
      ) : (
        <div className="rounded-lg border-2 border-primary-purple bg-gray-bg dark:bg-black p-6 flex items-center justify-center min-h-[200px]">
          <p className="text-hard-gray text-sm">
            Registra transacciones para ver la tendencia de ingresos vs gastos.
          </p>
        </div>
      )}

      {/* Expenses by Category — this month */}
      <div className="flex w-full gap-8 flex-wrap">
        {hasCategoryData ? (
          <ExpensesByCategoryChart data={summary.expensesByCategory as Parameters<typeof ExpensesByCategoryChart>[0]["data"]} />
        ) : (
          <div className="flex-1 rounded-lg border-2 border-primary-purple bg-gray-bg dark:bg-black p-6 flex items-center justify-center min-h-[200px]">
            <p className="text-hard-gray text-sm">
              Sin gastos categorizados este mes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
