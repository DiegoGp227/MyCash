import { fetcher, postFetcher, patchFetcher, deleteFetcher } from "@/utils/utils";
import { BudgetsURL } from "@/shared/constants/urls";
import {
  IBudgetsResponse,
  IBudgetResponse,
  ICreateBudget,
  IUpdateBudget,
} from "../types/budgets.types";

export const budgetsService = {
  async getBudgets(month: number, year: number): Promise<IBudgetsResponse> {
    const url = new URL(BudgetsURL);
    url.searchParams.append("month", String(month));
    url.searchParams.append("year", String(year));
    return fetcher<IBudgetsResponse>(url.toString());
  },

  async createBudget(data: ICreateBudget): Promise<IBudgetResponse> {
    return postFetcher<IBudgetResponse>(BudgetsURL.toString(), data);
  },

  async updateBudget(budgetId: string, data: IUpdateBudget): Promise<IBudgetResponse> {
    return patchFetcher<IBudgetResponse>(`${BudgetsURL.toString()}/${budgetId}`, data);
  },

  async deleteBudget(budgetId: string): Promise<void> {
    await deleteFetcher(`${BudgetsURL.toString()}/${budgetId}`);
  },
};
