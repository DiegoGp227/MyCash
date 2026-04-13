import { z } from "zod";

export const createTransactionSchema = z.object({
  accountId: z.string().min(1, "Account is required"),
  categoryId: z.string().optional(),
  type: z.enum(["INCOME", "EXPENSE"], { message: "Type must be INCOME or EXPENSE" }),
  amount: z.number().positive("Amount must be greater than 0"),
  description: z.string().max(255).optional(),
  date: z.string().min(1, "Date is required"),
});

export const updateTransactionSchema = z.object({
  accountId: z.string().optional(),
  categoryId: z.string().nullable().optional(),
  type: z.enum(["INCOME", "EXPENSE"]).optional(),
  amount: z.number().positive("Amount must be greater than 0").optional(),
  description: z.string().max(255).nullable().optional(),
  date: z.string().optional(),
});

export const transactionIdSchema = z.object({
  id: z.string().min(1, "Transaction ID is required"),
});

export const transactionQuerySchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]).optional(),
  accountId: z.string().optional(),
  categoryId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  limit: z.coerce.number().int().positive().max(200).optional(),
});
