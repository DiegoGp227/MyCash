import prisma from "../../db/prisma.js";
import { NotFoundError } from "../../errors/400Errors.js";
import { ICreateAccount, IUpdateAccount, IAccountResponse } from "./accounts.types.js";

const accountSelect = {
  id: true,
  name: true,
  type: true,
  balance: true,
  color: true,
  icon: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

const toResponse = (account: {
  id: string;
  name: string;
  type: string;
  balance: { toNumber: () => number };
  color: string | null;
  icon: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}): IAccountResponse => ({
  ...account,
  type: account.type as IAccountResponse["type"],
  balance: account.balance.toNumber(),
});

export const createAccount = async (
  userId: string,
  data: ICreateAccount
): Promise<IAccountResponse> => {
  const account = await prisma.account.create({
    data: {
      userId,
      name: data.name,
      type: data.type,
      balance: data.balance,
      color: data.color,
      icon: data.icon,
    },
    select: accountSelect,
  });

  return toResponse(account);
};

export const getAccounts = async (userId: string): Promise<IAccountResponse[]> => {
  const accounts = await prisma.account.findMany({
    where: { userId, isActive: true },
    select: accountSelect,
    orderBy: { name: "asc" },
  });

  return accounts.map(toResponse);
};

export const getAccountById = async (
  userId: string,
  accountId: string
): Promise<IAccountResponse> => {
  const account = await prisma.account.findFirst({
    where: { id: accountId, isActive: true },
    select: { ...accountSelect, userId: true },
  });

  if (!account || account.userId !== userId) {
    throw new NotFoundError("Account");
  }

  const { userId: _, ...data } = account;
  return toResponse(data);
};

export const updateAccount = async (
  userId: string,
  accountId: string,
  data: IUpdateAccount
): Promise<IAccountResponse> => {
  const account = await prisma.account.findFirst({
    where: { id: accountId, isActive: true },
    select: { userId: true },
  });

  if (!account || account.userId !== userId) {
    throw new NotFoundError("Account");
  }

  const updated = await prisma.account.update({
    where: { id: accountId },
    data,
    select: accountSelect,
  });

  return toResponse(updated);
};

export const deleteAccount = async (
  userId: string,
  accountId: string
): Promise<void> => {
  const account = await prisma.account.findFirst({
    where: { id: accountId, isActive: true },
    select: { userId: true },
  });

  if (!account || account.userId !== userId) {
    throw new NotFoundError("Account");
  }

  await prisma.account.update({
    where: { id: accountId },
    data: { isActive: false },
  });
};
