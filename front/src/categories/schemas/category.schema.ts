import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  color: z
    .string()
    .min(1, "El color es requerido")
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Color hexadecimal no valido"),
  icon: z.string().optional(),
  type: z.enum(["INCOME", "EXPENSE"]),
});

export type CategoryFormInput = z.infer<typeof categorySchema>;
