import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"], { message: "Select a type" }),
  amount: z.number({ message: "Amount must be a number" }).positive("Amount must be greater than 0"),
  accountId: z.string().min(1, "Select an account"),
  categoryId: z.string().optional(),
  description: z.string().max(255).optional(),
  date: z.string().min(1, "Date is required"),
});

export type TransactionFormInput = z.infer<typeof transactionSchema>;
