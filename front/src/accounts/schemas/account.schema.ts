import { z } from "zod";

export const accountSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  type: z.enum(
    ["CASH", "BANK", "CREDIT_CARD", "SAVINGS", "INVESTMENT", "DIGITAL_WALLET"],
    { message: "Selecciona un tipo de cuenta" }
  ),
  balance: z.number({ message: "El saldo debe ser un número" }),
  color: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Color hexadecimal no válido")
    .optional()
    .or(z.literal("")),
  icon: z.string().optional(),
});

export type AccountFormInput = z.infer<typeof accountSchema>;
