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

interface ExpenseTrendData {
  month: string;
  [category: string]: string | number;
}

interface ExpenseTrendsChartProps {
  data: ExpenseTrendData[];
  categories: { name: string; color: string }[];
}

// Tooltip personalizado
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);

    return (
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-3 shadow-xl">
        <p className="mb-2 font-semibold text-white">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={index}
            className="text-sm"
            style={{ color: entry.color }}
          >
            {entry.name}: ${entry.value?.toLocaleString()}
          </p>
        ))}
        <div className="mt-2 border-t border-gray-700 pt-2">
          <p className="text-sm font-semibold text-white">
            Total: ${total.toLocaleString()}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function ExpenseTrendsChart({
  data,
  categories,
}: ExpenseTrendsChartProps) {
  return (
    <div className="rounded-lg border-2 bg-gray-bg p-6 shadow-md dark:bg-black border-primary-purple">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        Evolución de Gastos por Categoría
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
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
          {categories.map((category) => (
            <Area
              key={category.name}
              type="monotone"
              dataKey={category.name}
              stackId="1"
              stroke={category.color}
              fill={category.color}
              fillOpacity={0.6}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
