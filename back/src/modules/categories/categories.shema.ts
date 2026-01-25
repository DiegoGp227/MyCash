import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  color: z
    .string()
    .min(1, "Color is required")
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color format"),
  icon: z.string().optional(),
  type: z.enum(["INCOME", "EXPENSE"], {
    message: "Type must be INCOME or EXPENSE",
  }),
});

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Name cannot be empty")
    .max(50, "Name must be less than 50 characters")
    .optional(),
  color: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color format")
    .optional(),
  icon: z.string().optional(),
});

export const categoryIdSchema = z.object({
  id: z.string().min(1, "Category ID is required"),
});
 