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
  TooltipProps,
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

// Tooltip personalizado
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const difference = payload[0].value! - payload[1].value!;
    const isDifferencePositive = difference > 0;

    return (
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-3 shadow-xl">
        <p className="mb-2 font-semibold text-white">{label}</p>
        <p className="text-sm text-green-400">
          Ingresos: ${payload[0].value?.toLocaleString()}
        </p>
        <p className="text-sm text-red-400">
          Gastos: ${payload[1].value?.toLocaleString()}
        </p>
        <div className="mt-2 border-t border-gray-700 pt-2">
          <p
            className={`text-sm font-semibold ${
              isDifferencePositive ? "text-green-400" : "text-red-400"
            }`}
          >
            Balance: {isDifferencePositive ? "+" : ""}$
            {difference.toLocaleString()}
          </p>
        </div>
      </div>
    );
  }
  return null;
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
          <Tooltip content={<CustomTooltip />} />
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
