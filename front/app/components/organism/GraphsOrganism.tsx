"use client";

import {
  IncomeVsExpensesChart,
  ExpensesByCategoryChart,
  TopCategoriesChart,
  AccountBalanceChart,
  BudgetVsActualChart,
  ExpenseTrendsChart,
  IncomeDistributionChart,
  CashFlowChart,
  ExpenseHeatmapChart,
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

// Datos de prueba para el LineChart - Balance de cuentas
const accountBalanceData = [
  { month: "Jul", "Cuenta Bancaria": 15000, "Tarjeta Crédito": 5000, "Ahorros": 20000, "Efectivo": 2000 },
  { month: "Ago", "Cuenta Bancaria": 18000, "Tarjeta Crédito": 4500, "Ahorros": 22000, "Efectivo": 1800 },
  { month: "Sep", "Cuenta Bancaria": 16000, "Tarjeta Crédito": 6000, "Ahorros": 23000, "Efectivo": 2200 },
  { month: "Oct", "Cuenta Bancaria": 20000, "Tarjeta Crédito": 5500, "Ahorros": 25000, "Efectivo": 1500 },
  { month: "Nov", "Cuenta Bancaria": 19000, "Tarjeta Crédito": 4800, "Ahorros": 27000, "Efectivo": 2500 },
  { month: "Dic", "Cuenta Bancaria": 22000, "Tarjeta Crédito": 5200, "Ahorros": 30000, "Efectivo": 3000 },
];

const accounts = [
  { name: "Cuenta Bancaria", color: "#8B5CF6" },
  { name: "Tarjeta Crédito", color: "#EF4444" },
  { name: "Ahorros", color: "#10B981" },
  { name: "Efectivo", color: "#F59E0B" },
];

// Datos para Presupuesto vs Real
const budgetVsActualData = [
  { category: "Vivienda", presupuesto: 8500, real: 8000 },
  { category: "Comida", presupuesto: 3000, real: 3250 },
  { category: "Transporte", presupuesto: 1500, real: 1200 },
  { category: "Entretenimiento", presupuesto: 1000, real: 899 },
  { category: "Salud", presupuesto: 2000, real: 1500 },
];

// Datos para Evolución de Gastos
const expenseTrendsData = [
  { month: "Jul", Vivienda: 8000, Comida: 2800, Transporte: 1100, Entretenimiento: 800, Salud: 1200 },
  { month: "Ago", Vivienda: 8000, Comida: 3100, Transporte: 1300, Entretenimiento: 950, Salud: 1400 },
  { month: "Sep", Vivienda: 8000, Comida: 2900, Transporte: 1000, Entretenimiento: 700, Salud: 1600 },
  { month: "Oct", Vivienda: 8000, Comida: 3300, Transporte: 1400, Entretenimiento: 1100, Salud: 1300 },
  { month: "Nov", Vivienda: 8000, Comida: 3000, Transporte: 1200, Entretenimiento: 850, Salud: 1500 },
  { month: "Dic", Vivienda: 8000, Comida: 3250, Transporte: 1200, Entretenimiento: 899, Salud: 1500 },
];

const expenseCategories = [
  { name: "Vivienda", color: "#8B5CF6" },
  { name: "Comida", color: "#10B981" },
  { name: "Transporte", color: "#F59E0B" },
  { name: "Entretenimiento", color: "#EF4444" },
  { name: "Salud", color: "#3B82F6" },
];

// Datos para Distribución de Ingresos
const incomeDistributionData = [
  { name: "Salario", value: 25000 },
  { name: "Freelance", value: 3500 },
  { name: "Inversiones", value: 1200 },
  { name: "Otros", value: 300 },
];

// Datos para Flujo de Efectivo Semanal
const cashFlowData = [
  { period: "Sem 1", entradas: 7500, salidas: 5200 },
  { period: "Sem 2", entradas: 6800, salidas: 6100 },
  { period: "Sem 3", entradas: 8200, salidas: 5800 },
  { period: "Sem 4", entradas: 7500, salidas: 6500 },
];

// Datos para Heatmap de Gastos
const expenseHeatmapData = [
  { day: "Lun", week1: 450, week2: 520, week3: 380, week4: 610 },
  { day: "Mar", week1: 320, week2: 280, week3: 450, week4: 390 },
  { day: "Mié", week1: 580, week2: 620, week3: 510, week4: 680 },
  { day: "Jue", week1: 410, week2: 390, week3: 420, week4: 450 },
  { day: "Vie", week1: 720, week2: 850, week3: 780, week4: 920 },
  { day: "Sáb", week1: 920, week2: 1050, week3: 980, week4: 1100 },
  { day: "Dom", week1: 380, week2: 420, week3: 350, week4: 480 },
];

export default function GraphsOrganism() {
  return (
    <div className="flex w-full flex-col gap-8 p-6">
      {/* LineChart - Ingresos vs Gastos */}
      <IncomeVsExpensesChart data={incomeExpensesData} />

      {/* LineChart - Balance de Cuentas */}
      <AccountBalanceChart data={accountBalanceData} accounts={accounts} />

      {/* BarChart - Presupuesto vs Real */}
      <BudgetVsActualChart data={budgetVsActualData} />

      {/* AreaChart - Evolución de Gastos */}
      <ExpenseTrendsChart data={expenseTrendsData} categories={expenseCategories} />

      {/* AreaChart - Flujo de Efectivo */}
      <CashFlowChart data={cashFlowData} />

      {/* Heatmap - Gastos por Día/Semana */}
      <ExpenseHeatmapChart data={expenseHeatmapData} />

      <div className="flex w-full gap-8 flex-wrap">
        {/* PieChart - Gastos por Categoría */}
        <ExpensesByCategoryChart data={expensesByCategoryData} />

        {/* PieChart - Distribución de Ingresos */}
        <IncomeDistributionChart data={incomeDistributionData} />

        {/* BarChart - Top 5 Categorías */}
        <TopCategoriesChart data={topCategoriesData} />
      </div>
    </div>
  );
}
