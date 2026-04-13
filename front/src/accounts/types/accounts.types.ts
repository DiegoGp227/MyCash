export type AccountType =
  | "CASH"
  | "BANK"
  | "CREDIT_CARD"
  | "SAVINGS"
  | "INVESTMENT"
  | "DIGITAL_WALLET";

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  CASH: "Efectivo",
  BANK: "Banco",
  CREDIT_CARD: "Tarjeta de Crédito",
  SAVINGS: "Ahorros",
  INVESTMENT: "Inversiones",
  DIGITAL_WALLET: "Billetera Digital",
};

export interface IAccount {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  color: string | null;
  icon: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateAccount {
  name: string;
  type: AccountType;
  balance: number;
  color?: string;
  icon?: string;
}

export interface IUpdateAccount {
  name?: string;
  color?: string;
  icon?: string;
  balance?: number;
}

export interface IAccountsResponse {
  accounts: IAccount[];
}

export interface IAccountResponse {
  message: string;
  account: IAccount;
}
