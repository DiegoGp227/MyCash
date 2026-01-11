"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IncomeData {
  name: string;
  value: number;
}

interface IncomeDistributionChartProps {
  data: IncomeData[];
}

const COLORS = ["#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#EC4899"];

// Tooltip personalizado
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const total = payload[0].payload.total;
    const percentage = ((payload[0].value / total) * 100).toFixed(1);

    return (
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-3 shadow-xl">
        <p className="mb-1 font-semibold text-white">{payload[0].name}</p>
        <p className="text-sm text-gray-300">
          ${payload[0].value.toLocaleString()}
        </p>
        <p className="text-xs text-gray-400">{percentage}% del total</p>
      </div>
    );
  }
  return null;
};

// Etiqueta personalizada
const renderLabel = (entry: any) => {
  return `${entry.name}: ${entry.percent}%`;
};

export default function IncomeDistributionChart({
  data,
}: IncomeDistributionChartProps) {
  // Calcular total para el tooltip
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithTotal = data.map((item) => ({ ...item, total }));

  return (
    <div className="flex-1 min-w-[300px] rounded-lg border-2 bg-light-bg p-6 shadow-md dark:bg-black border-primary-purple">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        Distribución de Ingresos
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dataWithTotal}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry) => `${((entry.value / total) * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {dataWithTotal.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
            }}
            formatter={(value, entry: any) => (
              <span className="text-sm">
                {value}: ${entry.payload.value.toLocaleString()}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
