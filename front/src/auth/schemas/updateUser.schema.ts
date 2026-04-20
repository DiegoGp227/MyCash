import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(3, "Username must be at least 3 characters").optional().or(z.literal("")),
});

export const preferencesSchema = z.object({
  currency: z.enum(["USD", "EUR", "GBP", "COP", "MXN", "BRL", "ARS", "CLP", "PEN", "JPY"]),
  cutoffDay: z
    .number()
    .int()
    .min(1, "Min 1")
    .max(31, "Max 31"),
});

export type ProfileFormInput = z.infer<typeof profileSchema>;
export type PreferencesFormInput = z.infer<typeof preferencesSchema>;
