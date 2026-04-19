import { fetcher, postFetcher, patchFetcher, deleteFetcher } from "@/utils/utils";
import { TransfersURL } from "@/shared/constants/urls";
import {
  ITransfersResponse,
  ITransferResponse,
  ICreateTransfer,
  IUpdateTransfer,
} from "../types/transfers.types";

export const transfersService = {
  async getTransfers(accountId?: string): Promise<ITransfersResponse> {
    const url = new URL(TransfersURL);
    if (accountId) url.searchParams.append("accountId", accountId);
    return fetcher<ITransfersResponse>(url.toString());
  },

  async createTransfer(data: ICreateTransfer): Promise<ITransferResponse> {
    return postFetcher<ITransferResponse>(TransfersURL.toString(), data);
  },

  async updateTransfer(id: string, data: IUpdateTransfer): Promise<ITransferResponse> {
    return patchFetcher<ITransferResponse>(`${TransfersURL.toString()}/${id}`, data);
  },

  async deleteTransfer(id: string): Promise<void> {
    await deleteFetcher(`${TransfersURL.toString()}/${id}`);
  },
};
