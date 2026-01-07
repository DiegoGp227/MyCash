"use client";

import {
  IncomeVsExpensesChart,
  ExpensesByCategoryChart,
  TopCategoriesChart,
} from "@/src/home/graphs";

// Datos de prueba para el LineChart - Ingresos vs Gastos
const incomeExpensesData = [
  { month: "Jul", ingresos: 28000, gastos: 22000 },
  { month: "Ago", ingresos: 30000, gastos: 25000 },
  { month: "Sep", ingresos: 25000, gastos: 21000 },
  { month: "Oct", ingresos: 32000, gastos: 28000 },
  { month: "Nov", ingresos: 29000, gastos: 23000 },
  { month: "Dic", ingresos: 30000, gastos: 15748 },
];

// Datos de prueba para el PieChart - Gastos por categoría
const expensesByCategoryData = [
  { name: "Vivienda", value: 8000 },
  { name: "Comida", value: 3250 },
  { name: "Transporte", value: 1200 },
  { name: "Entretenimiento", value: 899 },
  { name: "Salud", value: 1500 },
  { name: "Tecnología", value: 899 },
];

// Datos de prueba para el BarChart - Top 5 categorías
const topCategoriesData = [
  { category: "Vivienda", gasto: 8000 },
  { category: "Comida", gasto: 3250 },
  { category: "Salud", gasto: 1500 },
  { category: "Transporte", gasto: 1200 },
  { category: "Tecnología", gasto: 899 },
];

export default function GraphsOrganism() {
  return (
    <div className="flex w-full flex-col gap-8 p-6">
      {/* LineChart - Ingresos vs Gastos */}
      <IncomeVsExpensesChart data={incomeExpensesData} />

      <div className="flex w-full gap-8">
        {/* PieChart - Gastos por Categoría */}
        <ExpensesByCategoryChart data={expensesByCategoryData} />

        {/* BarChart - Top 5 Categorías */}
        <TopCategoriesChart data={topCategoriesData} />
      </div>
    </div>
  );
}
