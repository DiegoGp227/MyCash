import { AccountType } from "@prisma/client";

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

export interface IAccountResponse {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  color: string | null;
  icon: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
