import { Prisma } from "@prisma/client";
import prisma from "../../db/prisma.js";
import { NotFoundError, BadRequestError } from "../../errors/400Errors.js";
import {
  ICreateDebt,
  IUpdateDebt,
  ICreatePayment,
  IDebtResponse,
  IPayment,
  IDebtFilters,
} from "./debts.types.js";

const paymentSelect = {
  id: true,
  amount: true,
  note: true,
  paidAt: true,
  createdAt: true,
};

const debtSelect = {
  id: true,
  name: true,
  creditor: true,
  totalAmount: true,
  remainingAmount: true,
  interestRate: true,
  startDate: true,
  dueDate: true,
  paymentDay: true,
  status: true,
  notes: true,
  createdAt: true,
  updatedAt: true,
  payments: { select: paymentSelect, orderBy: { paidAt: "desc" as const } },
};

function toResponse(d: {
  id: string;
  name: string;
  creditor: string;
  totalAmount: Prisma.Decimal;
  remainingAmount: Prisma.Decimal;
  interestRate: Prisma.Decimal | null;
  startDate: Date;
  dueDate: Date | null;
  paymentDay: number | null;
  status: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  payments: { id: string; amount: Prisma.Decimal; note: string | null; paidAt: Date; createdAt: Date }[];
}): IDebtResponse {
  const payments: IPayment[] = d.payments.map((p) => ({
    id: p.id,
    amount: p.amount.toNumber(),
    note: p.note,
    paidAt: p.paidAt,
    createdAt: p.createdAt,
  }));

  return {
    id: d.id,
    name: d.name,
    creditor: d.creditor,
    totalAmount: d.totalAmount.toNumber(),
    remainingAmount: d.remainingAmount.toNumber(),
    interestRate: d.interestRate?.toNumber() ?? null,
    startDate: d.startDate,
    dueDate: d.dueDate,
    paymentDay: d.paymentDay,
    status: d.status as IDebtResponse["status"],
    notes: d.notes,
    payments,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  };
}

async function findDebtForUser(debtId: string, userId: string) {
  const debt = await prisma.debt.findFirst({
    where: { id: debtId, userId },
    select: { id: true, remainingAmount: true, status: true },
  });
  if (!debt) throw new NotFoundError("Debt");
  return debt;
}

export const createDebt = async (userId: string, data: ICreateDebt): Promise<IDebtResponse> => {
  const debt = await prisma.debt.create({
    data: {
      userId,
      name: data.name,
      creditor: data.creditor,
      totalAmount: data.totalAmount,
      remainingAmount: data.totalAmount,
      interestRate: data.interestRate ?? null,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      paymentDay: data.paymentDay ?? null,
      notes: data.notes ?? null,
    },
    select: debtSelect,
  });
  return toResponse(debt);
};

export const getDebts = async (userId: string, filters: IDebtFilters): Promise<IDebtResponse[]> => {
  const debts = await prisma.debt.findMany({
    where: { userId, ...(filters.status && { status: filters.status }) },
    select: debtSelect,
    orderBy: { createdAt: "desc" },
  });
  return debts.map(toResponse);
};

export const getDebtById = async (userId: string, debtId: string): Promise<IDebtResponse> => {
  const debt = await prisma.debt.findFirst({
    where: { id: debtId, userId },
    select: debtSelect,
  });
  if (!debt) throw new NotFoundError("Debt");
  return toResponse(debt);
};

export const updateDebt = async (
  userId: string,
  debtId: string,
  data: IUpdateDebt,
): Promise<IDebtResponse> => {
  await findDebtForUser(debtId, userId);

  const debt = await prisma.debt.update({
    where: { id: debtId },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.creditor !== undefined && { creditor: data.creditor }),
      ...(data.totalAmount !== undefined && { totalAmount: data.totalAmount }),
      ...(data.interestRate !== undefined && { interestRate: data.interestRate }),
      ...(data.dueDate !== undefined && { dueDate: data.dueDate ? new Date(data.dueDate) : null }),
      ...(data.paymentDay !== undefined && { paymentDay: data.paymentDay }),
      ...(data.notes !== undefined && { notes: data.notes }),
      ...(data.status !== undefined && { status: data.status }),
    },
    select: debtSelect,
  });
  return toResponse(debt);
};

export const deleteDebt = async (userId: string, debtId: string): Promise<void> => {
  await findDebtForUser(debtId, userId);
  await prisma.debt.delete({ where: { id: debtId } });
};

export const addPayment = async (
  userId: string,
  debtId: string,
  data: ICreatePayment,
): Promise<IDebtResponse> => {
  const existing = await findDebtForUser(debtId, userId);

  const remaining = existing.remainingAmount.toNumber();
  if (data.amount > remaining + 0.001) {
    throw new BadRequestError(`Payment amount (${data.amount}) exceeds remaining debt (${remaining})`);
  }

  const newRemaining = Math.max(0, remaining - data.amount);
  const isPaid = newRemaining === 0;

  await prisma.$transaction([
    prisma.payment.create({
      data: {
        debtId,
        amount: data.amount,
        note: data.note ?? null,
        paidAt: data.paidAt ? new Date(data.paidAt) : undefined,
      },
    }),
    prisma.debt.update({
      where: { id: debtId },
      data: {
        remainingAmount: newRemaining,
        ...(isPaid && { status: "PAID" }),
      },
    }),
  ]);

  const debt = await prisma.debt.findFirst({ where: { id: debtId, userId }, select: debtSelect });
  return toResponse(debt!);
};

export const deletePayment = async (
  userId: string,
  debtId: string,
  paymentId: string,
): Promise<IDebtResponse> => {
  const existing = await findDebtForUser(debtId, userId);

  const payment = await prisma.payment.findFirst({
    where: { id: paymentId, debtId },
    select: { id: true, amount: true },
  });
  if (!payment) throw new NotFoundError("Payment");

  const restoredRemaining = existing.remainingAmount.toNumber() + payment.amount.toNumber();
  const wasJustPaid = existing.status === "PAID";

  await prisma.$transaction([
    prisma.payment.delete({ where: { id: paymentId } }),
    prisma.debt.update({
      where: { id: debtId },
      data: {
        remainingAmount: restoredRemaining,
        ...(wasJustPaid && { status: "ACTIVE" }),
      },
    }),
  ]);

  const debt = await prisma.debt.findFirst({ where: { id: debtId, userId }, select: debtSelect });
  return toResponse(debt!);
};
