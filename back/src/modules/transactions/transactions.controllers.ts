import { Request, Response } from "express";
import { ZodIssue } from "zod";
import { ValidationError } from "../../errors/400Errors.js";
import { AppError, InternalServerError } from "../../errors/appError.js";
import {
  createTransactionSchema,
  updateTransactionSchema,
  transactionIdSchema,
  transactionQuerySchema,
} from "./transactions.shema.js";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "./transactions.services.js";

const parseErrors = (issues: ZodIssue[]) =>
  issues.reduce((acc: Record<string, string>, e) => {
    acc[e.path.map(String).join(".")] = e.message;
    return acc;
  }, {});

const handleError = (res: Response, error: unknown, ctx: string) => {
  console.error(`❌ Error ${ctx}:`, error);
  if (error instanceof AppError) {
    res.status(error.statusCode).json(error.toJSON());
    return;
  }
  const e = new InternalServerError("Internal server error");
  res.status(e.statusCode).json(e.toJSON());
};

/** POST /transactions */
export const createTransactionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = createTransactionSchema.safeParse(req.body);
    if (!v.success) throw new ValidationError("Validation errors", parseErrors(v.error.issues));

    const transaction = await createTransaction(userId, v.data);
    res.status(201).json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    handleError(res, error, "creating transaction");
  }
};

/** GET /transactions */
export const getTransactionsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = transactionQuerySchema.safeParse(req.query);
    if (!v.success) throw new ValidationError("Validation errors", parseErrors(v.error.issues));

    const transactions = await getTransactions(userId, v.data);
    res.status(200).json({ transactions });
  } catch (error) {
    handleError(res, error, "getting transactions");
  }
};

/** GET /transactions/:id */
export const getTransactionByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = transactionIdSchema.safeParse(req.params);
    if (!v.success) throw new ValidationError("Validation errors", parseErrors(v.error.issues));

    const transaction = await getTransactionById(userId, v.data.id);
    res.status(200).json({ transaction });
  } catch (error) {
    handleError(res, error, "getting transaction");
  }
};

/** PATCH /transactions/:id */
export const updateTransactionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;

    const params = transactionIdSchema.safeParse(req.params);
    if (!params.success) throw new ValidationError("Validation errors", parseErrors(params.error.issues));

    const body = updateTransactionSchema.safeParse(req.body);
    if (!body.success) throw new ValidationError("Validation errors", parseErrors(body.error.issues));

    const transaction = await updateTransaction(userId, params.data.id, body.data);
    res.status(200).json({ message: "Transaction updated successfully", transaction });
  } catch (error) {
    handleError(res, error, "updating transaction");
  }
};

/** DELETE /transactions/:id */
export const deleteTransactionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = transactionIdSchema.safeParse(req.params);
    if (!v.success) throw new ValidationError("Validation errors", parseErrors(v.error.issues));

    await deleteTransaction(userId, v.data.id);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    handleError(res, error, "deleting transaction");
  }
};
