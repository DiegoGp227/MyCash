export interface IBudgetCategory {
  id: string;
  name: string;
  color: string;
  icon: string | null;
}

export interface IBudgetSubcategory {
  id: string;
  name: string;
  color: string | null;
  icon: string | null;
}

export interface IBudget {
  id: string;
  categoryId: string | null;
  category: IBudgetCategory | null;
  subcategoryId: string | null;
  subcategory: IBudgetSubcategory | null;
  amount: number;
  spent: number;
  month: number;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateBudget {
  categoryId?: string;
  subcategoryId?: string;
  amount: number;
  month: number;
  year: number;
}

export interface IUpdateBudget {
  amount: number;
}

export interface IBudgetsResponse {
  budgets: IBudget[];
}

export interface IBudgetResponse {
  message: string;
  budget: IBudget;
}
