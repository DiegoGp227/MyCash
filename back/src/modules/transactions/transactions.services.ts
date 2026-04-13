import { Prisma } from "@prisma/client";
import prisma from "../../db/prisma.js";
import { NotFoundError, BadRequestError } from "../../errors/400Errors.js";
import {
  ICreateTransaction,
  IUpdateTransaction,
  ITransactionFilters,
  ITransactionResponse,
} from "./transactions.types.js";

const transactionSelect = {
  id: true,
  accountId: true,
  account: { select: { name: true } },
  categoryId: true,
  category: { select: { name: true } },
  type: true,
  amount: true,
  description: true,
  date: true,
  createdAt: true,
  updatedAt: true,
};

const toResponse = (t: {
  id: string;
  accountId: string;
  account: { name: string };
  categoryId: string | null;
  category: { name: string } | null;
  type: string;
  amount: { toNumber: () => number };
  description: string | null;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}): ITransactionResponse => ({
  id: t.id,
  accountId: t.accountId,
  accountName: t.account.name,
  categoryId: t.categoryId,
  categoryName: t.category?.name ?? null,
  type: t.type as ITransactionResponse["type"],
  amount: t.amount.toNumber(),
  description: t.description,
  date: t.date,
  createdAt: t.createdAt,
  updatedAt: t.updatedAt,
});

// Balance delta: positive means account balance increases, negative means it decreases
const balanceDelta = (type: string, amount: number) =>
  type === "INCOME" ? amount : -amount;

export const createTransaction = async (
  userId: string,
  data: ICreateTransaction
): Promise<ITransactionResponse> => {
  // Verify account belongs to user
  const account = await prisma.account.findFirst({
    where: { id: data.accountId, userId, isActive: true },
  });
  if (!account) throw new NotFoundError("Account");

  // Verify category if provided
  if (data.categoryId) {
    const category = await prisma.category.findFirst({
      where: { id: data.categoryId, userId, isActive: true, type: data.type },
    });
    if (!category) throw new NotFoundError("Category");
  }

  const delta = balanceDelta(data.type, data.amount);

  const [transaction] = await prisma.$transaction([
    prisma.transaction.create({
      data: {
        userId,
        accountId: data.accountId,
        categoryId: data.categoryId,
        type: data.type,
        amount: data.amount,
        description: data.description,
        date: new Date(data.date),
      },
      select: transactionSelect,
    }),
    prisma.account.update({
      where: { id: data.accountId },
      data: { balance: { increment: delta } },
    }),
  ]);

  return toResponse(transaction);
};

export const getTransactions = async (
  userId: string,
  filters: ITransactionFilters
): Promise<ITransactionResponse[]> => {
  const where: Prisma.TransactionWhereInput = { userId };

  if (filters.type) where.type = filters.type;
  if (filters.accountId) where.accountId = filters.accountId;
  if (filters.categoryId) where.categoryId = filters.categoryId;
  if (filters.startDate || filters.endDate) {
    where.date = {
      ...(filters.startDate && { gte: new Date(filters.startDate) }),
      ...(filters.endDate && { lte: new Date(filters.endDate) }),
    };
  }

  const transactions = await prisma.transaction.findMany({
    where,
    select: transactionSelect,
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    take: filters.limit ?? 50,
  });

  return transactions.map(toResponse);
};

export const getTransactionById = async (
  userId: string,
  transactionId: string
): Promise<ITransactionResponse> => {
  const transaction = await prisma.transaction.findFirst({
    where: { id: transactionId, userId },
    select: transactionSelect,
  });

  if (!transaction) throw new NotFoundError("Transaction");

  return toResponse(transaction);
};

export const updateTransaction = async (
  userId: string,
  transactionId: string,
  data: IUpdateTransaction
): Promise<ITransactionResponse> => {
  const existing = await prisma.transaction.findFirst({
    where: { id: transactionId, userId },
    select: { id: true, accountId: true, type: true, amount: true },
  });

  if (!existing) throw new NotFoundError("Transaction");

  const oldAccountId = existing.accountId;
  const newAccountId = data.accountId ?? oldAccountId;
  const accountChanging = newAccountId !== oldAccountId;

  if (accountChanging) {
    const newAccount = await prisma.account.findFirst({
      where: { id: newAccountId, userId, isActive: true },
    });
    if (!newAccount) throw new NotFoundError("Account");
  }

  const targetType = data.type ?? existing.type;
  if (data.categoryId) {
    const category = await prisma.category.findFirst({
      where: { id: data.categoryId, userId, isActive: true, type: targetType },
    });
    if (!category) throw new NotFoundError("Category");
  }

  const oldAmount = existing.amount.toNumber();
  const newAmount = data.amount ?? oldAmount;
  const oldType = existing.type;
  const newType = data.type ?? oldType;

  // Use interactive transaction to conditionally update one or two accounts
  const updated = await prisma.$transaction(async (tx) => {
    const transaction = await tx.transaction.update({
      where: { id: transactionId },
      data: {
        ...(data.accountId && { accountId: data.accountId }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
        ...(data.type && { type: data.type }),
        ...(data.amount !== undefined && { amount: data.amount }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.date && { date: new Date(data.date) }),
      },
      select: transactionSelect,
    });

    if (accountChanging) {
      // Reverse old effect on old account
      await tx.account.update({
        where: { id: oldAccountId },
        data: { balance: { increment: -balanceDelta(oldType, oldAmount) } },
      });
      // Apply new effect on new account
      await tx.account.update({
        where: { id: newAccountId },
        data: { balance: { increment: balanceDelta(newType, newAmount) } },
      });
    } else {
      // Same account: apply net difference in one update
      const net =
        -balanceDelta(oldType, oldAmount) + balanceDelta(newType, newAmount);
      await tx.account.update({
        where: { id: oldAccountId },
        data: { balance: { increment: net } },
      });
    }

    return transaction;
  });

  return toResponse(updated);
};

export const deleteTransaction = async (
  userId: string,
  transactionId: string
): Promise<void> => {
  const transaction = await prisma.transaction.findFirst({
    where: { id: transactionId, userId },
    select: { id: true, accountId: true, type: true, amount: true },
  });

  if (!transaction) throw new NotFoundError("Transaction");

  // Reverse the balance effect
  const reversal = -balanceDelta(transaction.type, transaction.amount.toNumber());

  await prisma.$transaction([
    prisma.transaction.delete({ where: { id: transactionId } }),
    prisma.account.update({
      where: { id: transaction.accountId },
      data: { balance: { increment: reversal } },
    }),
  ]);
};
