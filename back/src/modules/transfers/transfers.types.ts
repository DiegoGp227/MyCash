export interface ICreateTransfer {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description?: string;
  date: string; // ISO string
}

export interface IUpdateTransfer {
  fromAccountId?: string;
  toAccountId?: string;
  amount?: number;
  description?: string | null;
  date?: string;
}

export interface ITransferFilters {
  accountId?: string; // fromAccountId OR toAccountId
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export interface ITransferResponse {
  id: string;
  fromAccountId: string;
  fromAccountName: string;
  toAccountId: string;
  toAccountName: string;
  amount: number;
  description: string | null;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
