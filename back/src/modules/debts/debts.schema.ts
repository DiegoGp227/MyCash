import { z } from "zod";

export const createDebtSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  creditor: z.string().min(1, "Creditor is required").max(100),
  totalAmount: z.number().positive("Total amount must be positive"),
  interestRate: z.number().min(0).max(100).optional(),
  startDate: z.string().datetime().optional(),
  dueDate: z.string().datetime().optional().nullable(),
  paymentDay: z.number().int().min(1).max(31).optional(),
  notes: z.string().max(500).optional(),
});

export const updateDebtSchema = z
  .object({
    name: z.string().min(1).max(100).optional(),
    creditor: z.string().min(1).max(100).optional(),
    totalAmount: z.number().positive().optional(),
    interestRate: z.number().min(0).max(100).optional().nullable(),
    dueDate: z.string().datetime().optional().nullable(),
    paymentDay: z.number().int().min(1).max(31).optional().nullable(),
    notes: z.string().max(500).optional().nullable(),
    status: z.enum(["ACTIVE", "PAID", "OVERDUE"]).optional(),
  })
  .refine((d) => Object.keys(d).length > 0, { message: "At least one field required" });

export const debtIdSchema = z.object({
  id: z.string().min(1, "Debt ID is required"),
});

export const debtQuerySchema = z.object({
  status: z.enum(["ACTIVE", "PAID", "OVERDUE"]).optional(),
});

export const createPaymentSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  note: z.string().max(200).optional(),
  paidAt: z.string().datetime().optional(),
});

export const paymentIdSchema = z.object({
  id: z.string().min(1, "Debt ID is required"),
  paymentId: z.string().min(1, "Payment ID is required"),
});
