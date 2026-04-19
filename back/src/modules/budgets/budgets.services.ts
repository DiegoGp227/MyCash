import { Prisma } from "@prisma/client";
import prisma from "../../db/prisma.js";
import { NotFoundError, ResourceAlreadyExistsError } from "../../errors/400Errors.js";
import {
  ICreateBudget,
  IUpdateBudget,
  IBudgetFilters,
  IBudgetResponse,
} from "./budgets.types.js";

const budgetSelect = {
  id: true,
  categoryId: true,
  category: { select: { id: true, name: true, color: true, icon: true } },
  subcategoryId: true,
  subcategory: { select: { id: true, name: true, color: true, icon: true } },
  amount: true,
  month: true,
  year: true,
  createdAt: true,
  updatedAt: true,
};

async function calcSpent(
  userId: string,
  month: number,
  year: number,
  categoryId?: string | null,
  subcategoryId?: string | null,
): Promise<number> {
  const from = new Date(year, month - 1, 1);
  const to = new Date(year, month, 1);

  const result = await prisma.transaction.aggregate({
    where: {
      userId,
      type: "EXPENSE",
      date: { gte: from, lt: to },
      ...(subcategoryId
        ? { subcategoryId }
        : { categoryId: categoryId ?? undefined }),
    },
    _sum: { amount: true },
  });

  return (result._sum.amount as Prisma.Decimal | null)?.toNumber() ?? 0;
}

function toResponse(
  b: {
    id: string;
    categoryId: string | null;
    category: { id: string; name: string; color: string; icon: string | null } | null;
    subcategoryId: string | null;
    subcategory: { id: string; name: string; color: string | null; icon: string | null } | null;
    amount: Prisma.Decimal;
    month: number;
    year: number;
    createdAt: Date;
    updatedAt: Date;
  },
  spent: number,
): IBudgetResponse {
  return {
    id: b.id,
    categoryId: b.categoryId,
    category: b.category,
    subcategoryId: b.subcategoryId,
    subcategory: b.subcategory,
    amount: b.amount.toNumber(),
    spent,
    month: b.month,
    year: b.year,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
  };
}

export const createBudget = async (
  userId: string,
  data: ICreateBudget,
): Promise<IBudgetResponse> => {
  const existing = await prisma.budget.findFirst({
    where: {
      userId,
      month: data.month,
      year: data.year,
      ...(data.subcategoryId
        ? { subcategoryId: data.subcategoryId }
        : { categoryId: data.categoryId }),
    },
  });

  if (existing) {
    throw new ResourceAlreadyExistsError("Budget", {
      month: data.month,
      year: data.year,
    });
  }

  const budget = await prisma.budget.create({
    data: {
      userId,
      categoryId: data.categoryId ?? null,
      subcategoryId: data.subcategoryId ?? null,
      amount: data.amount,
      month: data.month,
      year: data.year,
    },
    select: budgetSelect,
  });

  const spent = await calcSpent(userId, data.month, data.year, budget.categoryId, budget.subcategoryId);
  return toResponse(budget, spent);
};

export const getBudgets = async (
  userId: string,
  filters: IBudgetFilters,
): Promise<IBudgetResponse[]> => {
  const now = new Date();
  const month = filters.month ?? now.getMonth() + 1;
  const year = filters.year ?? now.getFullYear();

  const budgets = await prisma.budget.findMany({
    where: { userId, month, year },
    select: budgetSelect,
    orderBy: { createdAt: "asc" },
  });

  return Promise.all(
    budgets.map(async (b) => {
      const spent = await calcSpent(userId, b.month, b.year, b.categoryId, b.subcategoryId);
      return toResponse(b, spent);
    }),
  );
};

export const getBudgetById = async (
  userId: string,
  budgetId: string,
): Promise<IBudgetResponse> => {
  const budget = await prisma.budget.findFirst({
    where: { id: budgetId, userId },
    select: budgetSelect,
  });

  if (!budget) throw new NotFoundError("Budget");

  const spent = await calcSpent(userId, budget.month, budget.year, budget.categoryId, budget.subcategoryId);
  return toResponse(budget, spent);
};

export const updateBudget = async (
  userId: string,
  budgetId: string,
  data: IUpdateBudget,
): Promise<IBudgetResponse> => {
  const existing = await prisma.budget.findFirst({
    where: { id: budgetId, userId },
    select: { id: true },
  });

  if (!existing) throw new NotFoundError("Budget");

  const budget = await prisma.budget.update({
    where: { id: budgetId },
    data: { amount: data.amount },
    select: budgetSelect,
  });

  const spent = await calcSpent(userId, budget.month, budget.year, budget.categoryId, budget.subcategoryId);
  return toResponse(budget, spent);
};

export const deleteBudget = async (
  userId: string,
  budgetId: string,
): Promise<void> => {
  const existing = await prisma.budget.findFirst({
    where: { id: budgetId, userId },
    select: { id: true },
  });

  if (!existing) throw new NotFoundError("Budget");

  await prisma.budget.delete({ where: { id: budgetId } });
};
