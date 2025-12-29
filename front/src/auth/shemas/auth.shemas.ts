import { z } from "zod";

/* =========================
   Reusable base schemas
========================= */

// Email
const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email");

// Password
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

// Supported currencies
const currencies = [
  "USD",
  "EUR",
  "GBP",
  "COP",
  "MXN",
  "BRL",
  "ARS",
  "CLP",
  "PEN",
  "JPY",
] as const;

/* =========================
   Login
========================= */

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

/* =========================
   Signup
========================= */

export const signupSchema = z
  .object({
    email: emailSchema,

    password: passwordSchema,

    confirmPassword: z
      .string()
      .min(8, "Confirm your password"),

    name: z
      .string()
      .min(1, "Name is required"),

    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .optional(),

    cutoffDay: z
      .number()
      .int()
      .min(1, "Cutoff day must be between 1 and 31")
      .max(31, "Cutoff day must be between 1 and 31"),

    currency: z.enum(currencies, {
      message: "Select a valid currency",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/* =========================
   Types
========================= */

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
