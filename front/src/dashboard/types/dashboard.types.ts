export interface IMonthlyPoint {
  month: string;
  income: number;
  expenses: number;
}

export interface ICategoryExpense {
  name: string;
  value: number;
}

export interface IRecentTransaction {
  id: string;
  accountName: string;
  categoryName: string | null;
  type: "INCOME" | "EXPENSE";
  amount: number;
  description: string | null;
  date: string;
}

export interface IDashboardSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  netThisMonth: number;
  recentTransactions: IRecentTransaction[];
  monthlyTrend: IMonthlyPoint[];
  expensesByCategory: ICategoryExpense[];
}

export interface IDashboardResponse {
  summary: IDashboardSummary;
}
