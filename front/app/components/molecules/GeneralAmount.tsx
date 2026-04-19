"use client";

import { TrendingUp, TrendingDown, Wallet, BarChart2 } from "lucide-react";
import type { IDashboardSummary } from "@/src/dashboard/types/dashboard.types";

interface GeneralAmountProps {
  summary: IDashboardSummary | null;
  isLoading: boolean;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  valueColor?: string;
  sub?: string;
  subColor?: string;
}

function StatCard({ title, value, icon, valueColor, sub, subColor }: CardProps) {
  return (
    <div className="flex flex-col gap-2 w-full min-h-[9rem] p-4 rounded border-2 border-primary-purple bg-gray-bg dark:bg-black">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-hard-gray">{title}</span>
        <span className="text-primary-purple">{icon}</span>
      </div>
      <div className={`text-3xl font-bold ${valueColor ?? "dark:text-white"}`}>{value}</div>
      {sub && <p className={`text-xs ${subColor ?? "text-hard-gray"}`}>{sub}</p>}
    </div>
  );
}

export default function GeneralAmount({ summary, isLoading }: GeneralAmountProps) {
  if (isLoading || !summary) {
    return (
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="min-h-[9rem] p-4 rounded border-2 border-primary-purple/30 bg-gray-bg dark:bg-black animate-pulse"
          />
        ))}
      </div>
    );
  }

  const net = summary.netThisMonth;
  const netPositive = net >= 0;

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
      <StatCard
        title="Balance Total"
        value={fmt(summary.totalBalance)}
        icon={<Wallet size={20} />}
        valueColor={summary.totalBalance >= 0 ? "text-green-600 dark:text-green-400" : "text-error"}
      />
      <StatCard
        title="Balance del Mes"
        value={`${netPositive ? "+" : ""}${fmt(net)}`}
        icon={<BarChart2 size={20} />}
        valueColor={netPositive ? "text-green-600 dark:text-green-400" : "text-error"}
        sub={netPositive ? "Mes con superávit" : "Mes con déficit"}
        subColor={netPositive ? "text-green-500" : "text-error"}
      />
      <StatCard
        title="Ingresos del Mes"
        value={`+${fmt(summary.monthlyIncome)}`}
        icon={<TrendingUp size={20} />}
        valueColor="text-green-600 dark:text-green-400"
      />
      <StatCard
        title="Gastos del Mes"
        value={`-${fmt(summary.monthlyExpenses)}`}
        icon={<TrendingDown size={20} />}
        valueColor="text-error"
      />
    </div>
  );
}
