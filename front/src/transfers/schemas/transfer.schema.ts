import { z } from "zod";

export const transferSchema = z
  .object({
    fromAccountId: z.string().min(1, "Selecciona la cuenta de origen"),
    toAccountId: z.string().min(1, "Selecciona la cuenta de destino"),
    amount: z
      .number({ message: "El monto debe ser un número" })
      .positive("El monto debe ser mayor a 0"),
    description: z.string().max(255).optional(),
    date: z.string().min(1, "La fecha es requerida"),
  })
  .refine((d) => d.fromAccountId !== d.toAccountId, {
    message: "Las cuentas de origen y destino deben ser diferentes",
    path: ["toAccountId"],
  });

export type TransferFormInput = z.infer<typeof transferSchema>;
