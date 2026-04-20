import { z } from "zod";

export const accountSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  type: z.enum(
    ["CASH", "BANK", "CREDIT_CARD", "SAVINGS", "INVESTMENT", "DIGITAL_WALLET"],
    { message: "Select an account type" }
  ),
  balance: z.number({ message: "Balance must be a number" }),
  color: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color")
    .optional()
    .or(z.literal("")),
  icon: z.string().optional(),
});

export type AccountFormInput = z.infer<typeof accountSchema>;
