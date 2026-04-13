import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"], { message: "Selecciona un tipo" }),
  amount: z.number({ message: "El monto debe ser un número" }).positive("El monto debe ser mayor a 0"),
  accountId: z.string().min(1, "Selecciona una cuenta"),
  categoryId: z.string().optional(),
  description: z.string().max(255).optional(),
  date: z.string().min(1, "La fecha es requerida"),
});

export type TransactionFormInput = z.infer<typeof transactionSchema>;
