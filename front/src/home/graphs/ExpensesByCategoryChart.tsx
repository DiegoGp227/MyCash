"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ExpensesCategoryData {
  name: string;
  value: number;
}

interface ExpensesByCategoryChartProps {
  data: ExpensesCategoryData[];
}

const PIE_COLORS = [
  "#7C3AED",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#8B5CF6",
];

export default function ExpensesByCategoryChart({
  data,
}: ExpensesByCategoryChartProps) {
  return (
    <div className="flex-1 rounded-lg bg-light-bg p-6 shadow-md dark:bg-black">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        Gastos por Categoría
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={PIE_COLORS[index % PIE_COLORS.length]}
              />
            ))}
          </Pie>
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
