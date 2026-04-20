import { z } from "zod";

export const transferSchema = z
  .object({
    fromAccountId: z.string().min(1, "Select source account"),
    toAccountId: z.string().min(1, "Select destination account"),
    amount: z
      .number({ message: "Amount must be a number" })
      .positive("Amount must be greater than 0"),
    description: z.string().max(255).optional(),
    date: z.string().min(1, "Date is required"),
  })
  .refine((d) => d.fromAccountId !== d.toAccountId, {
    message: "Source and destination accounts must be different",
    path: ["toAccountId"],
  });

export type TransferFormInput = z.infer<typeof transferSchema>;
