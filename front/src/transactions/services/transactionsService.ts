import { fetcher, postFetcher, patchFetcher, deleteFetcher } from "@/utils/utils";
import { TransactionsURL } from "@/shared/constants/urls";
import {
  ITransactionsResponse,
  ITransactionResponse,
  ICreateTransaction,
  IUpdateTransaction,
  ITransactionFilters,
} from "../types/transactions.types";

export const transactionsService = {
  async getTransactions(filters?: ITransactionFilters): Promise<ITransactionsResponse> {
    const url = new URL(TransactionsURL.toString());
    if (filters?.type) url.searchParams.set("type", filters.type);
    if (filters?.accountId) url.searchParams.set("accountId", filters.accountId);
    if (filters?.startDate) url.searchParams.set("startDate", filters.startDate);
    if (filters?.endDate) url.searchParams.set("endDate", filters.endDate);
    return fetcher<ITransactionsResponse>(url.toString());
  },

  async createTransaction(data: ICreateTransaction): Promise<ITransactionResponse> {
    return postFetcher<ITransactionResponse>(TransactionsURL.toString(), data);
  },

  async updateTransaction(id: string, data: IUpdateTransaction): Promise<ITransactionResponse> {
    return patchFetcher<ITransactionResponse>(`${TransactionsURL.toString()}/${id}`, data);
  },

  async deleteTransaction(id: string): Promise<void> {
    await deleteFetcher(`${TransactionsURL.toString()}/${id}`);
  },
};
