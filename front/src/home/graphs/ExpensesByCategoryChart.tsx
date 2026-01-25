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
  [key: string]: string | number;
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

// Tooltip personalizado
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const percentage = data.payload.percent
      ? (data.payload.percent * 100).toFixed(1)
      : 0;

    return (
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-3 shadow-xl">
        <p className="mb-1 font-semibold text-white">{data.name}</p>
        <p className="text-sm text-green-400">
          Monto: ${data.value?.toLocaleString()}
        </p>
        <p className="text-sm text-purple-400">Porcentaje: {percentage}%</p>
      </div>
    );
  }
  return null;
};

export default function ExpensesByCategoryChart({
  data,
}: ExpensesByCategoryChartProps) {
  return (
    <div className="flex-1 rounded-lg border-2 bg-gray-bg p-6 shadow-md dark:bg-black border-primary-purple">
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
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
