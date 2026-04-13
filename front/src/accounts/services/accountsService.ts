import { fetcher, postFetcher, patchFetcher, deleteFetcher } from "@/utils/utils";
import { AccountsURL } from "@/shared/constants/urls";
import {
  IAccountsResponse,
  IAccountResponse,
  ICreateAccount,
  IUpdateAccount,
} from "../types/accounts.types";

export const accountsService = {
  async getAccounts(): Promise<IAccountsResponse> {
    return fetcher<IAccountsResponse>(AccountsURL.toString());
  },

  async createAccount(data: ICreateAccount): Promise<IAccountResponse> {
    return postFetcher<IAccountResponse>(AccountsURL.toString(), data);
  },

  async updateAccount(accountId: string, data: IUpdateAccount): Promise<IAccountResponse> {
    const url = `${AccountsURL.toString()}/${accountId}`;
    return patchFetcher<IAccountResponse>(url, data);
  },

  async deleteAccount(accountId: string): Promise<void> {
    const url = `${AccountsURL.toString()}/${accountId}`;
    await deleteFetcher(url);
  },
};
