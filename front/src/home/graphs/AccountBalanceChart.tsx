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

interface AccountBalanceData {
  month: string;
  [accountName: string]: string | number;
}

interface AccountBalanceChartProps {
  data: AccountBalanceData[];
  accounts: { name: string; color: string }[];
}

// Tooltip personalizado
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
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
      </div>
    );
  }
  return null;
};

export default function AccountBalanceChart({
  data,
  accounts,
}: AccountBalanceChartProps) {
  return (
    <div className="rounded-lg border-2 bg-light-bg p-6 shadow-md dark:bg-black border-primary-purple">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        Balance de Cuentas por Mes
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
          {accounts.map((account) => (
            <Line
              key={account.name}
              type="monotone"
              dataKey={account.name}
              stroke={account.color}
              strokeWidth={3}
              dot={{ fill: account.color, r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
