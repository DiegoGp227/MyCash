"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CashFlowData {
  period: string;
  entradas: number;
  salidas: number;
}

interface CashFlowChartProps {
  data: CashFlowData[];
}

const COLORS = {
  income: "#10B981",
  expense: "#EF4444",
};

// Tooltip personalizado
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const income = payload[0].value;
    const expense = payload[1].value;
    const netFlow = income - expense;

    return (
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-3 shadow-xl">
        <p className="mb-2 font-semibold text-white">{label}</p>
        <p className="text-sm text-green-400">
          Entradas: ${income.toLocaleString()}
        </p>
        <p className="text-sm text-red-400">
          Salidas: ${expense.toLocaleString()}
        </p>
        <div className="mt-2 border-t border-gray-700 pt-2">
          <p
            className={`text-sm font-semibold ${
              netFlow >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            Flujo Neto: {netFlow >= 0 ? "+" : ""}${netFlow.toLocaleString()}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function CashFlowChart({ data }: CashFlowChartProps) {
  return (
    <div className="rounded-lg border-2 bg-light-bg p-6 shadow-md dark:bg-black border-primary-purple">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        Flujo de Efectivo Semanal
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="period" stroke="#6B7280" />
          <YAxis
            stroke="#6B7280"
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
            }}
          />
          <Area
            type="monotone"
            dataKey="entradas"
            stroke={COLORS.income}
            fill={COLORS.income}
            fillOpacity={0.6}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="salidas"
            stroke={COLORS.expense}
            fill={COLORS.expense}
            fillOpacity={0.6}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
