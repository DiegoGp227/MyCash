"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IncomeExpensesData {
  month: string;
  ingresos: number;
  gastos: number;
}

interface IncomeVsExpensesChartProps {
  data: IncomeExpensesData[];
}

const COLORS = {
  success: "#10B981",
  danger: "#EF4444",
};

export default function IncomeVsExpensesChart({
  data,
}: IncomeVsExpensesChartProps) {
  return (
    <div className="rounded-lg bg-light-bg p-6 shadow-md dark:bg-black">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        Ingresos vs Gastos
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#6B7280" />
          <YAxis
            stroke="#6B7280"
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            formatter={(value: number | undefined) =>
              value !== undefined ? `$${value.toLocaleString()}` : "$0"
            }
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
            }}
          />
          <Line
            type="monotone"
            dataKey="ingresos"
            stroke={COLORS.success}
            strokeWidth={3}
            dot={{ fill: COLORS.success, r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="gastos"
            stroke={COLORS.danger}
            strokeWidth={3}
            dot={{ fill: COLORS.danger, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
