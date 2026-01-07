"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TopCategoryData {
  category: string;
  gasto: number;
}

interface TopCategoriesChartProps {
  data: TopCategoryData[];
}

const BAR_COLORS = ["#7C3AED", "#10B981", "#EF4444", "#3B82F6", "#F59E0B"];

// Tooltip personalizado
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const total = data.payload.total || 15748; // Total de gastos ejemplo
    const percentage = ((data.value / total) * 100).toFixed(1);

    return (
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-3 shadow-xl">
        <p className="mb-1 font-semibold text-white">{data.payload.category}</p>
        <p className="text-sm text-green-400">
          Gasto: ${data.value?.toLocaleString()}
        </p>
        <p className="text-sm text-purple-400">{percentage}% del total</p>
      </div>
    );
  }
  return null;
};

export default function TopCategoriesChart({ data }: TopCategoriesChartProps) {
  return (
    <div className="flex-1 rounded-lg border-2 bg-light-bg p-6 shadow-md dark:bg-black border-primary-purple">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        Top 5 Categorías de Gasto
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            type="number"
            stroke="#6B7280"
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <YAxis type="category" dataKey="category" stroke="#6B7280" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="gasto" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={BAR_COLORS[index % BAR_COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
