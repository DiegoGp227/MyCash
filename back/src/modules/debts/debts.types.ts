export type DebtStatus = "ACTIVE" | "PAID" | "OVERDUE";

export interface ICreateDebt {
  name: string;
  creditor: string;
  totalAmount: number;
  interestRate?: number;
  startDate?: string;
  dueDate?: string | null;
  paymentDay?: number;
  notes?: string;
}

export interface IUpdateDebt {
  name?: string;
  creditor?: string;
  totalAmount?: number;
  interestRate?: number | null;
  dueDate?: string | null;
  paymentDay?: number | null;
  notes?: string | null;
  status?: DebtStatus;
}

export interface ICreatePayment {
  amount: number;
  note?: string;
  paidAt?: string;
}

export interface IPayment {
  id: string;
  amount: number;
  note: string | null;
  paidAt: Date;
  createdAt: Date;
}

export interface IDebtResponse {
  id: string;
  name: string;
  creditor: string;
  totalAmount: number;
  remainingAmount: number;
  interestRate: number | null;
  startDate: Date;
  dueDate: Date | null;
  paymentDay: number | null;
  status: DebtStatus;
  notes: string | null;
  payments: IPayment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IDebtFilters {
  status?: DebtStatus;
}
