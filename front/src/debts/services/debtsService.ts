import { fetcher, postFetcher, patchFetcher, deleteFetcher } from "@/utils/utils";
import { DebtsURL } from "@/shared/constants/urls";
import {
  IDebtsResponse,
  IDebtResponse,
  ICreateDebt,
  IUpdateDebt,
  ICreatePayment,
  DebtStatus,
} from "../types/debts.types";

export const debtsService = {
  async getDebts(status?: DebtStatus): Promise<IDebtsResponse> {
    const url = new URL(DebtsURL);
    if (status) url.searchParams.append("status", status);
    return fetcher<IDebtsResponse>(url.toString());
  },

  async createDebt(data: ICreateDebt): Promise<IDebtResponse> {
    return postFetcher<IDebtResponse>(DebtsURL.toString(), data);
  },

  async updateDebt(debtId: string, data: IUpdateDebt): Promise<IDebtResponse> {
    return patchFetcher<IDebtResponse>(`${DebtsURL.toString()}/${debtId}`, data);
  },

  async deleteDebt(debtId: string): Promise<void> {
    await deleteFetcher(`${DebtsURL.toString()}/${debtId}`);
  },

  async addPayment(debtId: string, data: ICreatePayment): Promise<IDebtResponse> {
    return postFetcher<IDebtResponse>(`${DebtsURL.toString()}/${debtId}/payments`, data);
  },

  async deletePayment(debtId: string, paymentId: string): Promise<IDebtResponse> {
    return deleteFetcher(
      `${DebtsURL.toString()}/${debtId}/payments/${paymentId}`,
    ) as Promise<IDebtResponse>;
  },
};
