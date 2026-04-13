import { z } from "zod";

const ACCOUNT_TYPES = [
  "CASH",
  "BANK",
  "CREDIT_CARD",
  "SAVINGS",
  "INVESTMENT",
  "DIGITAL_WALLET",
] as const;

export const createAccountSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  type: z.enum(ACCOUNT_TYPES, {
    message: "Invalid account type",
  }),
  balance: z.number(),
  color: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color format")
    .optional(),
  icon: z.string().optional(),
});

export const updateAccountSchema = z.object({
  name: z
    .string()
    .min(1, "Name cannot be empty")
    .max(50, "Name must be less than 50 characters")
    .optional(),
  color: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color format")
    .optional(),
  icon: z.string().optional(),
  balance: z.number().optional(),
});

export const accountIdSchema = z.object({
  id: z.string().min(1, "Account ID is required"),
});
