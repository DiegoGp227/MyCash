export type AccountType =
  | "CASH"
  | "BANK"
  | "CREDIT_CARD"
  | "SAVINGS"
  | "INVESTMENT"
  | "DIGITAL_WALLET";

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  CASH: "Cash",
  BANK: "Bank",
  CREDIT_CARD: "Credit Card",
  SAVINGS: "Savings",
  INVESTMENT: "Investments",
  DIGITAL_WALLET: "Digital Wallet",
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
