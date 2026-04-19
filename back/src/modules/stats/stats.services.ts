import prisma from "../../db/prisma.js";
import { getCurrentPeriod, getLastNPeriods } from "../../utils/period.js";

export interface IMonthlyPoint {
  month: string;
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
  periodStart: Date;
  periodEnd: Date;
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

  // Fetch user cutoffDay
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { cutoffDay: true },
  });

  const cutoffDay = user?.cutoffDay ?? 1;

  const { start: periodStart, end: periodEnd } = getCurrentPeriod(cutoffDay, now);
  const last6 = getLastNPeriods(cutoffDay, 6, now);

  // Oldest period start for the trend query
  const trendSince = last6[0].start;

  const [accounts, monthlyAgg, recentRaw, trendRaw, expByCatRaw] = await Promise.all([
    prisma.account.findMany({
      where: { userId, isActive: true },
      select: { balance: true },
    }),

    prisma.transaction.groupBy({
      by: ["type"],
      where: { userId, date: { gte: periodStart, lt: periodEnd } },
      _sum: { amount: true },
    }),

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

    prisma.transaction.findMany({
      where: { userId, date: { gte: trendSince } },
      select: { type: true, amount: true, date: true },
    }),

    prisma.transaction.findMany({
      where: {
        userId,
        type: "EXPENSE",
        date: { gte: periodStart, lt: periodEnd },
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

  // Current period income / expenses
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

  // Trend: assign each transaction to its cutoff period
  const trendMap = new Map<string, { income: number; expenses: number; label: string }>();

  for (const p of last6) {
    const key = p.start.toISOString();
    trendMap.set(key, { income: 0, expenses: 0, label: p.label });
  }

  for (const t of trendRaw) {
    // Find which period this transaction belongs to
    for (const p of last6) {
      if (t.date >= p.start && t.date < p.end) {
        const key = p.start.toISOString();
        const entry = trendMap.get(key)!;
        const amount = t.amount.toNumber();
        if (t.type === "INCOME") entry.income += amount;
        else entry.expenses += amount;
        break;
      }
    }
  }

  const monthlyTrend: IMonthlyPoint[] = Array.from(trendMap.values()).map((v) => ({
    month: v.label,
    income: Math.round(v.income),
    expenses: Math.round(v.expenses),
  }));

  // Expenses by category
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
    periodStart,
    periodEnd,
    recentTransactions,
    monthlyTrend,
    expensesByCategory,
  };
};
