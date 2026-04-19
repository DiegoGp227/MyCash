import { Request, Response } from "express";
import type { ZodIssue } from "zod";
import { ValidationError } from "../../errors/400Errors.js";
import { AppError, InternalServerError } from "../../errors/appError.js";
import {
  createGoalSchema,
  updateGoalSchema,
  goalIdSchema,
  goalQuerySchema,
  createContributionSchema,
  contributionIdSchema,
} from "./goals.schema.js";
import {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
  addContribution,
  deleteContribution,
} from "./goals.services.js";

function parseErrors(issues: ZodIssue[]) {
  return issues.reduce((acc: Record<string, string>, err) => {
    acc[err.path.map(String).join(".")] = err.message;
    return acc;
  }, {});
}

function handleError(res: Response, error: unknown, label: string) {
  console.error(`❌ Error ${label}:`, error);
  if (error instanceof AppError) {
    res.status(error.statusCode).json(error.toJSON());
    return;
  }
  const e = new InternalServerError("Internal server error");
  res.status(e.statusCode).json(e.toJSON());
}

export const createGoalController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = createGoalSchema.safeParse(req.body);
    if (!v.success) throw new ValidationError("Validation errors", parseErrors(v.error.issues));
    const goal = await createGoal(userId, v.data);
    res.status(201).json({ message: "Goal created successfully", goal });
  } catch (error) {
    handleError(res, error, "creating goal");
  }
};

export const getGoalsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = goalQuerySchema.safeParse(req.query);
    if (!v.success) throw new ValidationError("Validation errors", parseErrors(v.error.issues));
    const goals = await getGoals(userId, v.data);
    res.status(200).json({ goals });
  } catch (error) {
    handleError(res, error, "getting goals");
  }
};

export const getGoalByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = goalIdSchema.safeParse(req.params);
    if (!v.success) throw new ValidationError("Validation errors", parseErrors(v.error.issues));
    const goal = await getGoalById(userId, v.data.id);
    res.status(200).json({ goal });
  } catch (error) {
    handleError(res, error, "getting goal");
  }
};

export const updateGoalController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const vp = goalIdSchema.safeParse(req.params);
    if (!vp.success) throw new ValidationError("Validation errors", parseErrors(vp.error.issues));
    const vb = updateGoalSchema.safeParse(req.body);
    if (!vb.success) throw new ValidationError("Validation errors", parseErrors(vb.error.issues));
    const goal = await updateGoal(userId, vp.data.id, vb.data);
    res.status(200).json({ message: "Goal updated successfully", goal });
  } catch (error) {
    handleError(res, error, "updating goal");
  }
};

export const deleteGoalController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = goalIdSchema.safeParse(req.params);
    if (!v.success) throw new ValidationError("Validation errors", parseErrors(v.error.issues));
    await deleteGoal(userId, v.data.id);
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    handleError(res, error, "deleting goal");
  }
};

export const addContributionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const vp = goalIdSchema.safeParse(req.params);
    if (!vp.success) throw new ValidationError("Validation errors", parseErrors(vp.error.issues));
    const vb = createContributionSchema.safeParse(req.body);
    if (!vb.success) throw new ValidationError("Validation errors", parseErrors(vb.error.issues));
    const goal = await addContribution(userId, vp.data.id, vb.data);
    res.status(201).json({ message: "Contribution added successfully", goal });
  } catch (error) {
    handleError(res, error, "adding contribution");
  }
};

export const deleteContributionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = contributionIdSchema.safeParse(req.params);
    if (!v.success) throw new ValidationError("Validation errors", parseErrors(v.error.issues));
    const goal = await deleteContribution(userId, v.data.id, v.data.contributionId);
    res.status(200).json({ message: "Contribution deleted successfully", goal });
  } catch (error) {
    handleError(res, error, "deleting contribution");
  }
};
