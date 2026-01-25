"use client";

interface HeatmapData {
  day: string;
  week1: number;
  week2: number;
  week3: number;
  week4: number;
}

interface ExpenseHeatmapChartProps {
  data: HeatmapData[];
}

const getColorIntensity = (value: number, max: number) => {
  if (value === 0) return "bg-gray-100 dark:bg-gray-900";
  const intensity = Math.ceil((value / max) * 5);

  switch (intensity) {
    case 1:
      return "bg-purple-100 dark:bg-purple-950";
    case 2:
      return "bg-purple-200 dark:bg-purple-900";
    case 3:
      return "bg-purple-300 dark:bg-purple-800";
    case 4:
      return "bg-purple-400 dark:bg-purple-700";
    case 5:
      return "bg-purple-500 dark:bg-purple-600";
    default:
      return "bg-purple-100 dark:bg-purple-950";
  }
};

export default function ExpenseHeatmapChart({
  data,
}: ExpenseHeatmapChartProps) {
  // Encontrar el valor máximo para normalizar los colores
  const maxValue = Math.max(
    ...data.flatMap((d) => [d.week1, d.week2, d.week3, d.week4])
  );

  const weeks = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];

  return (
    <div className="rounded-lg border-2 bg-gray-bg p-6 shadow-md dark:bg-black border-primary-purple">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        Heatmap de Gastos
      </h3>
      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          {/* Header */}
          <div className="grid grid-cols-5 gap-2 mb-2">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400"></div>
            {weeks.map((week) => (
              <div
                key={week}
                className="text-xs font-semibold text-center text-gray-600 dark:text-gray-400"
              >
                {week}
              </div>
            ))}
          </div>

          {/* Heatmap Grid */}
          {data.map((row) => (
            <div key={row.day} className="grid grid-cols-5 gap-2 mb-2">
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center">
                {row.day}
              </div>
              {["week1", "week2", "week3", "week4"].map((week) => {
                const value = row[week as keyof Omit<HeatmapData, "day">];
                return (
                  <div
                    key={week}
                    className={`h-12 rounded-md flex items-center justify-center cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${getColorIntensity(
                      value,
                      maxValue
                    )}`}
                    title={`${row.day} - ${week}: $${value.toLocaleString()}`}
                  >
                    <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                      ${(value / 1000).toFixed(1)}k
                    </span>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Legend */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Menos</span>
            <div className="flex gap-1">
              <div className="w-8 h-4 rounded bg-purple-100 dark:bg-purple-950"></div>
              <div className="w-8 h-4 rounded bg-purple-200 dark:bg-purple-900"></div>
              <div className="w-8 h-4 rounded bg-purple-300 dark:bg-purple-800"></div>
              <div className="w-8 h-4 rounded bg-purple-400 dark:bg-purple-700"></div>
              <div className="w-8 h-4 rounded bg-purple-500 dark:bg-purple-600"></div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Más</span>
          </div>
        </div>
      </div>
    </div>
  );
}
