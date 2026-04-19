import { Request, Response } from "express";
import type { ZodIssue } from "zod";
import { ValidationError } from "../../errors/400Errors.js";
import { AppError, InternalServerError } from "../../errors/appError.js";
import {
  createBudgetSchema,
  updateBudgetSchema,
  budgetIdSchema,
  budgetQuerySchema,
} from "./budgets.schema.js";
import {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
} from "./budgets.services.js";

function parseErrors(issues: ZodIssue[]) {
  return issues.reduce(
    (acc: Record<string, string>, err) => {
      acc[err.path.map(String).join(".")] = err.message;
      return acc;
    },
    {},
  );
}

export const createBudgetController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const validation = createBudgetSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError("Validation errors", parseErrors(validation.error.issues));
    }
    const budget = await createBudget(userId, validation.data);
    res.status(201).json({ message: "Budget created successfully", budget });
  } catch (error) {
    console.error("❌ Error creating budget:", error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json(error.toJSON());
      return;
    }
    const e = new InternalServerError("Internal server error");
    res.status(e.statusCode).json(e.toJSON());
  }
};

export const getBudgetsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const queryValidation = budgetQuerySchema.safeParse(req.query);
    if (!queryValidation.success) {
      throw new ValidationError("Validation errors", parseErrors(queryValidation.error.issues));
    }
    const budgets = await getBudgets(userId, queryValidation.data);
    res.status(200).json({ budgets });
  } catch (error) {
    console.error("❌ Error getting budgets:", error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json(error.toJSON());
      return;
    }
    const e = new InternalServerError("Internal server error");
    res.status(e.statusCode).json(e.toJSON());
  }
};

export const getBudgetByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const paramsValidation = budgetIdSchema.safeParse(req.params);
    if (!paramsValidation.success) {
      throw new ValidationError("Validation errors", parseErrors(paramsValidation.error.issues));
    }
    const budget = await getBudgetById(userId, paramsValidation.data.id);
    res.status(200).json({ budget });
  } catch (error) {
    console.error("❌ Error getting budget:", error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json(error.toJSON());
      return;
    }
    const e = new InternalServerError("Internal server error");
    res.status(e.statusCode).json(e.toJSON());
  }
};

export const updateBudgetController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const paramsValidation = budgetIdSchema.safeParse(req.params);
    if (!paramsValidation.success) {
      throw new ValidationError("Validation errors", parseErrors(paramsValidation.error.issues));
    }
    const bodyValidation = updateBudgetSchema.safeParse(req.body);
    if (!bodyValidation.success) {
      throw new ValidationError("Validation errors", parseErrors(bodyValidation.error.issues));
    }
    const budget = await updateBudget(userId, paramsValidation.data.id, bodyValidation.data);
    res.status(200).json({ message: "Budget updated successfully", budget });
  } catch (error) {
    console.error("❌ Error updating budget:", error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json(error.toJSON());
      return;
    }
    const e = new InternalServerError("Internal server error");
    res.status(e.statusCode).json(e.toJSON());
  }
};

export const deleteBudgetController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const paramsValidation = budgetIdSchema.safeParse(req.params);
    if (!paramsValidation.success) {
      throw new ValidationError("Validation errors", parseErrors(paramsValidation.error.issues));
    }
    await deleteBudget(userId, paramsValidation.data.id);
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting budget:", error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json(error.toJSON());
      return;
    }
    const e = new InternalServerError("Internal server error");
    res.status(e.statusCode).json(e.toJSON());
  }
};
