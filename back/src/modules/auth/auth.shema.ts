import { z } from "zod";

/* =========================
   Base schemas
========================= */

const emailSchema = z.string().email();

const passwordSchema = z.string().min(8);

const nameSchema = z.string().min(1);

const usernameSchema = z.string().min(3);

const cutoffDaySchema = z
  .number()
  .int()
  .min(1)
  .max(31);

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

const currencySchema = z.enum(currencies);

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

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  username: usernameSchema.optional(),
  cutoffDay: cutoffDaySchema,
  currency: currencySchema,
});

/* =========================
   Types
========================= */

export type LoginDTO = z.infer<typeof loginSchema>;
export type SignupDTO = z.infer<typeof signupSchema>;
