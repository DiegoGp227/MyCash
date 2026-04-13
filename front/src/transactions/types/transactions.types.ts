export type TransactionType = "INCOME" | "EXPENSE";

export interface ITransaction {
  id: string;
  accountId: string;
  accountName: string;
  categoryId: string | null;
  categoryName: string | null;
  type: TransactionType;
  amount: number;
  description: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateTransaction {
  accountId: string;
  categoryId?: string;
  type: TransactionType;
  amount: number;
  description?: string;
  date: string;
}

export interface IUpdateTransaction {
  accountId?: string;
  categoryId?: string | null;
  type?: TransactionType;
  amount?: number;
  description?: string | null;
  date?: string;
}

export interface ITransactionFilters {
  type?: TransactionType;
  accountId?: string;
  startDate?: string;
  endDate?: string;
}

export interface ITransactionsResponse {
  transactions: ITransaction[];
}

export interface ITransactionResponse {
  message: string;
  transaction: ITransaction;
}
