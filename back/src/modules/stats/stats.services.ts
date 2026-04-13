import prisma from "../../db/prisma.js";

export interface IMonthlyPoint {
  month: string; // "Ene", "Feb", etc.
  income: number;
  expenses: number;
}

export interface ICategoryExpense {
  name: string;
  value: number;
}

export interface IDashboardSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  netThisMonth: number;
  recentTransactions: {
    id: string;
    accountName: string;
    categoryName: string | null;
    type: string;
    amount: number;
    description: string | null;
    date: Date;
  }[];
  monthlyTrend: IMonthlyPoint[];
  expensesByCategory: ICategoryExpense[];
}

const MONTH_NAMES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export const getDashboardSummary = async (userId: string): Promise<IDashboardSummary> => {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  // Start of 6 months ago
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const [accounts, monthlyAgg, recentRaw, last6MonthsRaw, expByCatRaw] = await Promise.all([
    // Total balance across all active accounts
    prisma.account.findMany({
      where: { userId, isActive: true },
      select: { balance: true },
    }),

    // Monthly income + expenses aggregates
    prisma.transaction.groupBy({
      by: ["type"],
      where: { userId, date: { gte: monthStart, lte: monthEnd } },
      _sum: { amount: true },
    }),

    // Last 5 transactions
    prisma.transaction.findMany({
      where: { userId },
      select: {
        id: true,
        account: { select: { name: true } },
        category: { select: { name: true } },
        type: true,
        amount: true,
        description: true,
        date: true,
      },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
      take: 5,
    }),

    // Transactions from the last 6 months for trend chart
    prisma.transaction.findMany({
      where: { userId, date: { gte: sixMonthsAgo } },
      select: { type: true, amount: true, date: true },
    }),

    // Expenses by category this month
    prisma.transaction.findMany({
      where: {
        userId,
        type: "EXPENSE",
        date: { gte: monthStart, lte: monthEnd },
        categoryId: { not: null },
      },
      select: {
        amount: true,
        category: { select: { name: true } },
      },
    }),
  ]);

  // Total balance
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance.toNumber(), 0);

  // Monthly income/expenses
  let monthlyIncome = 0;
  let monthlyExpenses = 0;
  for (const row of monthlyAgg) {
    const val = row._sum.amount?.toNumber() ?? 0;
    if (row.type === "INCOME") monthlyIncome = val;
    else monthlyExpenses = val;
  }

  // Recent transactions
  const recentTransactions = recentRaw.map((t) => ({
    id: t.id,
    accountName: t.account.name,
    categoryName: t.category?.name ?? null,
    type: t.type,
    amount: t.amount.toNumber(),
    description: t.description,
    date: t.date,
  }));

  // Monthly trend: build a map [year-month] → { income, expenses }
  const trendMap = new Map<string, { income: number; expenses: number }>();

  // Initialize all 6 months with 0
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    trendMap.set(key, { income: 0, expenses: 0 });
  }

  for (const t of last6MonthsRaw) {
    const key = `${t.date.getFullYear()}-${t.date.getMonth()}`;
    const entry = trendMap.get(key);
    if (!entry) continue;
    const amount = t.amount.toNumber();
    if (t.type === "INCOME") entry.income += amount;
    else entry.expenses += amount;
  }

  const monthlyTrend: IMonthlyPoint[] = Array.from(trendMap.entries()).map(([key, val]) => {
    const [year, month] = key.split("-").map(Number);
    return {
      month: MONTH_NAMES[month],
      income: Math.round(val.income),
      expenses: Math.round(val.expenses),
    };
  });

  // Expenses by category: group by name and sum
  const catMap = new Map<string, number>();
  for (const t of expByCatRaw) {
    const name = t.category?.name ?? "Sin categoría";
    catMap.set(name, (catMap.get(name) ?? 0) + t.amount.toNumber());
  }
  const expensesByCategory: ICategoryExpense[] = Array.from(catMap.entries())
    .map(([name, value]) => ({ name, value: Math.round(value) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    netThisMonth: monthlyIncome - monthlyExpenses,
    recentTransactions,
    monthlyTrend,
    expensesByCategory,
  };
};
