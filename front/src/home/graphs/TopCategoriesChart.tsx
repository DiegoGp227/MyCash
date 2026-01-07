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

const BAR_COLORS = [
  "#7C3AED",
  "#10B981",
  "#EF4444",
  "#3B82F6",
  "#F59E0B",
];

export default function TopCategoriesChart({
  data,
}: TopCategoriesChartProps) {
  return (
    <div className="flex-1 rounded-lg bg-light-bg p-6 shadow-md dark:bg-black">
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
