export interface ITransfer {
  id: string;
  fromAccountId: string;
  fromAccountName: string;
  toAccountId: string;
  toAccountName: string;
  amount: number;
  description: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateTransfer {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description?: string;
  date: string;
}

export interface IUpdateTransfer {
  fromAccountId?: string;
  toAccountId?: string;
  amount?: number;
  description?: string | null;
  date?: string;
}

export interface ITransfersResponse {
  transfers: ITransfer[];
}

export interface ITransferResponse {
  message: string;
  transfer: ITransfer;
}
