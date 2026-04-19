import { z } from "zod";

const currentYear = new Date().getFullYear();

export const createBudgetSchema = z
  .object({
    categoryId: z.string().min(1).optional(),
    subcategoryId: z.string().min(1).optional(),
    amount: z.number().positive("Amount must be positive"),
    month: z
      .number()
      .int()
      .min(1, "Month must be between 1 and 12")
      .max(12, "Month must be between 1 and 12"),
    year: z
      .number()
      .int()
      .min(currentYear - 5, "Year is too old")
      .max(currentYear + 5, "Year is too far in the future"),
  })
  .refine((data) => data.categoryId || data.subcategoryId, {
    message: "Either categoryId or subcategoryId is required",
  })
  .refine((data) => !(data.categoryId && data.subcategoryId), {
    message: "Cannot specify both categoryId and subcategoryId",
  });

export const updateBudgetSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
});

export const budgetIdSchema = z.object({
  id: z.string().min(1, "Budget ID is required"),
});

export const budgetQuerySchema = z.object({
  month: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : undefined))
    .refine((v) => v === undefined || (v >= 1 && v <= 12), {
      message: "Month must be between 1 and 12",
    }),
  year: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : undefined)),
});
