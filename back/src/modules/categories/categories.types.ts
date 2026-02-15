import { TransactionType } from "@prisma/client";

export interface ICreateCategory {
  name: string;
  color: string;
  icon?: string;
  type: TransactionType;
}

export interface IUpdateCategory {
  name?: string;
  color?: string;
  icon?: string;
}

export interface ICategoryResponse {
  id: string;
  name: string;
  color: string;
  icon: string | null;
  type: TransactionType;
  isActive: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  subcategoriesCount: number;
}
