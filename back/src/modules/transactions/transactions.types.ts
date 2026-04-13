import { TransactionType } from "@prisma/client";

export interface ICreateTransaction {
  accountId: string;
  categoryId?: string;
  type: TransactionType;
  amount: number;
  description?: string;
  date: string; // ISO string
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
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export interface ITransactionResponse {
  id: string;
  accountId: string;
  accountName: string;
  categoryId: string | null;
  categoryName: string | null;
  type: TransactionType;
  amount: number;
  description: string | null;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
