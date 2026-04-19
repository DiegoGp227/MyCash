import { Prisma } from "@prisma/client";
import prisma from "../../db/prisma.js";
import { NotFoundError, BadRequestError } from "../../errors/400Errors.js";
import {
  ICreateTransfer,
  IUpdateTransfer,
  ITransferFilters,
  ITransferResponse,
} from "./transfers.types.js";

const transferSelect = {
  id: true,
  fromAccountId: true,
  fromAccount: { select: { name: true } },
  toAccountId: true,
  toAccount: { select: { name: true } },
  amount: true,
  description: true,
  date: true,
  createdAt: true,
  updatedAt: true,
};

const toResponse = (t: {
  id: string;
  fromAccountId: string;
  fromAccount: { name: string };
  toAccountId: string;
  toAccount: { name: string };
  amount: { toNumber: () => number };
  description: string | null;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}): ITransferResponse => ({
  id: t.id,
  fromAccountId: t.fromAccountId,
  fromAccountName: t.fromAccount.name,
  toAccountId: t.toAccountId,
  toAccountName: t.toAccount.name,
  amount: t.amount.toNumber(),
  description: t.description,
  date: t.date,
  createdAt: t.createdAt,
  updatedAt: t.updatedAt,
});

const findAccount = async (accountId: string, userId: string) => {
  const account = await prisma.account.findFirst({
    where: { id: accountId, userId, isActive: true },
  });
  if (!account) throw new NotFoundError("Account");
  return account;
};

export const createTransfer = async (
  userId: string,
  data: ICreateTransfer
): Promise<ITransferResponse> => {
  if (data.fromAccountId === data.toAccountId) {
    throw new BadRequestError("Origin and destination accounts must be different");
  }

  await findAccount(data.fromAccountId, userId);
  await findAccount(data.toAccountId, userId);

  const transfer = await prisma.$transaction(async (tx) => {
    const created = await tx.transfer.create({
      data: {
        userId,
        fromAccountId: data.fromAccountId,
        toAccountId: data.toAccountId,
        amount: data.amount,
        description: data.description,
        date: new Date(data.date),
      },
      select: transferSelect,
    });

    await tx.account.update({
      where: { id: data.fromAccountId },
      data: { balance: { decrement: data.amount } },
    });

    await tx.account.update({
      where: { id: data.toAccountId },
      data: { balance: { increment: data.amount } },
    });

    return created;
  });

  return toResponse(transfer);
};

export const getTransfers = async (
  userId: string,
  filters: ITransferFilters
): Promise<ITransferResponse[]> => {
  const where: Prisma.TransferWhereInput = { userId };

  if (filters.accountId) {
    where.OR = [
      { fromAccountId: filters.accountId },
      { toAccountId: filters.accountId },
    ];
  }

  if (filters.startDate || filters.endDate) {
    where.date = {
      ...(filters.startDate && { gte: new Date(filters.startDate) }),
      ...(filters.endDate && { lte: new Date(filters.endDate) }),
    };
  }

  const transfers = await prisma.transfer.findMany({
    where,
    select: transferSelect,
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    take: filters.limit ?? 50,
  });

  return transfers.map(toResponse);
};

export const getTransferById = async (
  userId: string,
  transferId: string
): Promise<ITransferResponse> => {
  const transfer = await prisma.transfer.findFirst({
    where: { id: transferId, userId },
    select: transferSelect,
  });

  if (!transfer) throw new NotFoundError("Transfer");

  return toResponse(transfer);
};

export const updateTransfer = async (
  userId: string,
  transferId: string,
  data: IUpdateTransfer
): Promise<ITransferResponse> => {
  const existing = await prisma.transfer.findFirst({
    where: { id: transferId, userId },
    select: {
      id: true,
      fromAccountId: true,
      toAccountId: true,
      amount: true,
    },
  });

  if (!existing) throw new NotFoundError("Transfer");

  const newFromId = data.fromAccountId ?? existing.fromAccountId;
  const newToId = data.toAccountId ?? existing.toAccountId;

  if (newFromId === newToId) {
    throw new BadRequestError("Origin and destination accounts must be different");
  }

  if (data.fromAccountId) await findAccount(data.fromAccountId, userId);
  if (data.toAccountId) await findAccount(data.toAccountId, userId);

  const oldAmount = existing.amount.toNumber();
  const newAmount = data.amount ?? oldAmount;
  const oldFromId = existing.fromAccountId;
  const oldToId = existing.toAccountId;

  const updated = await prisma.$transaction(async (tx) => {
    // Reverse the old transfer effect
    await tx.account.update({
      where: { id: oldFromId },
      data: { balance: { increment: oldAmount } },
    });
    await tx.account.update({
      where: { id: oldToId },
      data: { balance: { decrement: oldAmount } },
    });

    // Apply the new transfer effect
    await tx.account.update({
      where: { id: newFromId },
      data: { balance: { decrement: newAmount } },
    });
    await tx.account.update({
      where: { id: newToId },
      data: { balance: { increment: newAmount } },
    });

    return tx.transfer.update({
      where: { id: transferId },
      data: {
        ...(data.fromAccountId && { fromAccountId: data.fromAccountId }),
        ...(data.toAccountId && { toAccountId: data.toAccountId }),
        ...(data.amount !== undefined && { amount: data.amount }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.date && { date: new Date(data.date) }),
      },
      select: transferSelect,
    });
  });

  return toResponse(updated);
};

export const deleteTransfer = async (
  userId: string,
  transferId: string
): Promise<void> => {
  const transfer = await prisma.transfer.findFirst({
    where: { id: transferId, userId },
    select: {
      id: true,
      fromAccountId: true,
      toAccountId: true,
      amount: true,
    },
  });

  if (!transfer) throw new NotFoundError("Transfer");

  const amount = transfer.amount.toNumber();

  await prisma.$transaction([
    prisma.transfer.delete({ where: { id: transferId } }),
    prisma.account.update({
      where: { id: transfer.fromAccountId },
      data: { balance: { increment: amount } },
    }),
    prisma.account.update({
      where: { id: transfer.toAccountId },
      data: { balance: { decrement: amount } },
    }),
  ]);
};
