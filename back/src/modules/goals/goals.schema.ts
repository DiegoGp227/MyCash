import { z } from "zod";

export const createGoalSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  targetAmount: z.number().positive("Target amount must be positive"),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional().nullable(),
  icon: z.string().optional(),
});

export const updateGoalSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name cannot be empty")
      .max(100, "Name must be less than 100 characters")
      .optional(),
    targetAmount: z.number().positive("Target amount must be positive").optional(),
    endDate: z.string().datetime().optional().nullable(),
    status: z.enum(["ACTIVE", "COMPLETED", "CANCELLED"]).optional(),
    icon: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export const goalIdSchema = z.object({
  id: z.string().min(1, "Goal ID is required"),
});

export const goalQuerySchema = z.object({
  status: z.enum(["ACTIVE", "COMPLETED", "CANCELLED"]).optional(),
});

export const createContributionSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  note: z.string().max(200).optional(),
});

export const contributionIdSchema = z.object({
  id: z.string().min(1, "Goal ID is required"),
  contributionId: z.string().min(1, "Contribution ID is required"),
});
