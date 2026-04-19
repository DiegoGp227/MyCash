import { Prisma } from "@prisma/client";
import prisma from "../../db/prisma.js";
import { NotFoundError } from "../../errors/400Errors.js";
import {
  ICreateGoal,
  IUpdateGoal,
  ICreateContribution,
  IGoalResponse,
  IContribution,
  IGoalFilters,
} from "./goals.types.js";

const contributionSelect = {
  id: true,
  amount: true,
  note: true,
  createdAt: true,
};

const goalSelect = {
  id: true,
  name: true,
  targetAmount: true,
  startDate: true,
  endDate: true,
  status: true,
  icon: true,
  createdAt: true,
  updatedAt: true,
  contributions: { select: contributionSelect, orderBy: { createdAt: "desc" as const } },
};

function toResponse(g: {
  id: string;
  name: string;
  targetAmount: Prisma.Decimal;
  startDate: Date;
  endDate: Date | null;
  status: string;
  icon: string | null;
  createdAt: Date;
  updatedAt: Date;
  contributions: { id: string; amount: Prisma.Decimal; note: string | null; createdAt: Date }[];
}): IGoalResponse {
  const contributions: IContribution[] = g.contributions.map((c) => ({
    id: c.id,
    amount: c.amount.toNumber(),
    note: c.note,
    createdAt: c.createdAt,
  }));

  const currentAmount = contributions.reduce((sum, c) => sum + c.amount, 0);

  return {
    id: g.id,
    name: g.name,
    targetAmount: g.targetAmount.toNumber(),
    currentAmount,
    startDate: g.startDate,
    endDate: g.endDate,
    status: g.status as IGoalResponse["status"],
    icon: g.icon,
    contributions,
    createdAt: g.createdAt,
    updatedAt: g.updatedAt,
  };
}

async function findGoalForUser(goalId: string, userId: string) {
  const goal = await prisma.goal.findFirst({
    where: { id: goalId, userId },
    select: { id: true },
  });
  if (!goal) throw new NotFoundError("Goal");
  return goal;
}

export const createGoal = async (
  userId: string,
  data: ICreateGoal,
): Promise<IGoalResponse> => {
  const goal = await prisma.goal.create({
    data: {
      userId,
      name: data.name,
      targetAmount: data.targetAmount,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : null,
      icon: data.icon,
    },
    select: goalSelect,
  });
  return toResponse(goal);
};

export const getGoals = async (
  userId: string,
  filters: IGoalFilters,
): Promise<IGoalResponse[]> => {
  const goals = await prisma.goal.findMany({
    where: { userId, ...(filters.status && { status: filters.status }) },
    select: goalSelect,
    orderBy: { createdAt: "desc" },
  });
  return goals.map(toResponse);
};

export const getGoalById = async (
  userId: string,
  goalId: string,
): Promise<IGoalResponse> => {
  const goal = await prisma.goal.findFirst({
    where: { id: goalId, userId },
    select: goalSelect,
  });
  if (!goal) throw new NotFoundError("Goal");
  return toResponse(goal);
};

export const updateGoal = async (
  userId: string,
  goalId: string,
  data: IUpdateGoal,
): Promise<IGoalResponse> => {
  await findGoalForUser(goalId, userId);

  const goal = await prisma.goal.update({
    where: { id: goalId },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.targetAmount !== undefined && { targetAmount: data.targetAmount }),
      ...(data.endDate !== undefined && { endDate: data.endDate ? new Date(data.endDate) : null }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.icon !== undefined && { icon: data.icon }),
    },
    select: goalSelect,
  });
  return toResponse(goal);
};

export const deleteGoal = async (
  userId: string,
  goalId: string,
): Promise<void> => {
  await findGoalForUser(goalId, userId);
  await prisma.goal.delete({ where: { id: goalId } });
};

export const addContribution = async (
  userId: string,
  goalId: string,
  data: ICreateContribution,
): Promise<IGoalResponse> => {
  await findGoalForUser(goalId, userId);

  await prisma.contribution.create({
    data: { goalId, amount: data.amount, note: data.note },
  });

  const goal = await prisma.goal.findFirst({
    where: { id: goalId, userId },
    select: goalSelect,
  });

  return toResponse(goal!);
};

export const deleteContribution = async (
  userId: string,
  goalId: string,
  contributionId: string,
): Promise<IGoalResponse> => {
  await findGoalForUser(goalId, userId);

  const contribution = await prisma.contribution.findFirst({
    where: { id: contributionId, goalId },
    select: { id: true },
  });
  if (!contribution) throw new NotFoundError("Contribution");

  await prisma.contribution.delete({ where: { id: contributionId } });

  const goal = await prisma.goal.findFirst({
    where: { id: goalId, userId },
    select: goalSelect,
  });
  return toResponse(goal!);
};
