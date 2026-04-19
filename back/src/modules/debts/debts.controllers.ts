import { Request, Response } from "express";
import type { ZodIssue } from "zod";
import { ValidationError } from "../../errors/400Errors.js";
import { AppError, InternalServerError } from "../../errors/appError.js";
import {
  createDebtSchema,
  updateDebtSchema,
  debtIdSchema,
  debtQuerySchema,
  createPaymentSchema,
  paymentIdSchema,
} from "./debts.schema.js";
import {
  createDebt,
  getDebts,
  getDebtById,
  updateDebt,
  deleteDebt,
  addPayment,
  deletePayment,
} from "./debts.services.js";

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

export const createDebtController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = createDebtSchema.safeParse(req.body);
    if (!v.success) throw new ValidationError("Validation errors", parseErrors(v.error.issues));
    const debt = await createDebt(userId, v.data);
    res.status(201).json({ message: "Debt created successfully", debt });
  } catch (error) { handleError(res, error, "creating debt"); }
};

export const getDebtsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = debtQuerySchema.safeParse(req.query);
    if (!v.success) throw new ValidationError("Validation errors", parseErrors(v.error.issues));
    const debts = await getDebts(userId, v.data);
    res.status(200).json({ debts });
  } catch (error) { handleError(res, error, "getting debts"); }
};

export const getDebtByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = debtIdSchema.safeParse(req.params);
    if (!v.success) throw new ValidationError("Validation errors", parseErrors(v.error.issues));
    const debt = await getDebtById(userId, v.data.id);
    res.status(200).json({ debt });
  } catch (error) { handleError(res, error, "getting debt"); }
};

export const updateDebtController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const vp = debtIdSchema.safeParse(req.params);
    if (!vp.success) throw new ValidationError("Validation errors", parseErrors(vp.error.issues));
    const vb = updateDebtSchema.safeParse(req.body);
    if (!vb.success) throw new ValidationError("Validation errors", parseErrors(vb.error.issues));
    const debt = await updateDebt(userId, vp.data.id, vb.data);
    res.status(200).json({ message: "Debt updated successfully", debt });
  } catch (error) { handleError(res, error, "updating debt"); }
};

export const deleteDebtController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = debtIdSchema.safeParse(req.params);
    if (!v.success) throw new ValidationError("Validation errors", parseErrors(v.error.issues));
    await deleteDebt(userId, v.data.id);
    res.status(200).json({ message: "Debt deleted successfully" });
  } catch (error) { handleError(res, error, "deleting debt"); }
};

export const addPaymentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const vp = debtIdSchema.safeParse(req.params);
    if (!vp.success) throw new ValidationError("Validation errors", parseErrors(vp.error.issues));
    const vb = createPaymentSchema.safeParse(req.body);
    if (!vb.success) throw new ValidationError("Validation errors", parseErrors(vb.error.issues));
    const debt = await addPayment(userId, vp.data.id, vb.data);
    res.status(201).json({ message: "Payment added successfully", debt });
  } catch (error) { handleError(res, error, "adding payment"); }
};

export const deletePaymentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = paymentIdSchema.safeParse(req.params);
    if (!v.success) throw new ValidationError("Validation errors", parseErrors(v.error.issues));
    const debt = await deletePayment(userId, v.data.id, v.data.paymentId);
    res.status(200).json({ message: "Payment deleted successfully", debt });
  } catch (error) { handleError(res, error, "deleting payment"); }
};
