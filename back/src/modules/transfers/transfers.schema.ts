import { z } from "zod";

export const createTransferSchema = z
  .object({
    fromAccountId: z.string().min(1, "Origin account is required"),
    toAccountId: z.string().min(1, "Destination account is required"),
    amount: z.number().positive("Amount must be greater than 0"),
    description: z.string().max(255).optional(),
    date: z.string().min(1, "Date is required"),
  })
  .refine((d) => d.fromAccountId !== d.toAccountId, {
    message: "Origin and destination accounts must be different",
    path: ["toAccountId"],
  });

export const updateTransferSchema = z
  .object({
    fromAccountId: z.string().optional(),
    toAccountId: z.string().optional(),
    amount: z.number().positive("Amount must be greater than 0").optional(),
    description: z.string().max(255).nullable().optional(),
    date: z.string().optional(),
  })
  .refine(
    (d) =>
      !(d.fromAccountId && d.toAccountId) ||
      d.fromAccountId !== d.toAccountId,
    {
      message: "Origin and destination accounts must be different",
      path: ["toAccountId"],
    }
  );

export const transferIdSchema = z.object({
  id: z.string().min(1, "Transfer ID is required"),
});

export const transferQuerySchema = z.object({
  accountId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  limit: z.coerce.number().int().positive().max(200).optional(),
});
