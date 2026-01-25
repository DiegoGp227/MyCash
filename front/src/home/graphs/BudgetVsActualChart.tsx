"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BudgetData {
  category: string;
  presupuesto: number;
  real: number;
}

interface BudgetVsActualChartProps {
  data: BudgetData[];
}

const COLORS = {
  budget: "#8B5CF6",
  actual: "#10B981",
  over: "#EF4444",
};

// Tooltip personalizado
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const budget = payload[0].value;
    const actual = payload[1].value;
    const difference = budget - actual;
    const percentage = ((actual / budget) * 100).toFixed(1);

    return (
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-3 shadow-xl">
        <p className="mb-2 font-semibold text-white">{label}</p>
        <p className="text-sm text-purple-400">
          Presupuesto: ${budget.toLocaleString()}
        </p>
        <p className="text-sm text-green-400">
          Real: ${actual.toLocaleString()}
        </p>
        <div className="mt-2 border-t border-gray-700 pt-2">
          <p
            className={`text-sm font-semibold ${
              difference >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {difference >= 0 ? "Ahorrado" : "Excedido"}: $
            {Math.abs(difference).toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">
            {percentage}% del presupuesto
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function BudgetVsActualChart({
  data,
}: BudgetVsActualChartProps) {
  return (
    <div className="rounded-lg border-2 bg-gray-bg p-6 shadow-md dark:bg-black border-primary-purple">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        Presupuesto vs Real
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="category" stroke="#6B7280" />
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
          <Bar dataKey="presupuesto" fill={COLORS.budget} radius={[8, 8, 0, 0]} />
          <Bar dataKey="real" fill={COLORS.actual} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
