import { Request, Response } from "express";
import { ZodIssue } from "zod";
import { ValidationError } from "../../errors/400Errors.js";
import { AppError, InternalServerError } from "../../errors/appError.js";
import {
  createTransferSchema,
  updateTransferSchema,
  transferIdSchema,
  transferQuerySchema,
} from "./transfers.schema.js";
import {
  createTransfer,
  getTransfers,
  getTransferById,
  updateTransfer,
  deleteTransfer,
} from "./transfers.services.js";

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

/** POST /transfers */
export const createTransferController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = createTransferSchema.safeParse(req.body);
    if (!v.success)
      throw new ValidationError("Validation errors", parseErrors(v.error.issues));

    const transfer = await createTransfer(userId, v.data);
    res.status(201).json({ message: "Transfer created successfully", transfer });
  } catch (error) {
    handleError(res, error, "creating transfer");
  }
};

/** GET /transfers */
export const getTransfersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = transferQuerySchema.safeParse(req.query);
    if (!v.success)
      throw new ValidationError("Validation errors", parseErrors(v.error.issues));

    const transfers = await getTransfers(userId, v.data);
    res.status(200).json({ transfers });
  } catch (error) {
    handleError(res, error, "getting transfers");
  }
};

/** GET /transfers/:id */
export const getTransferByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = transferIdSchema.safeParse(req.params);
    if (!v.success)
      throw new ValidationError("Validation errors", parseErrors(v.error.issues));

    const transfer = await getTransferById(userId, v.data.id);
    res.status(200).json({ transfer });
  } catch (error) {
    handleError(res, error, "getting transfer");
  }
};

/** PATCH /transfers/:id */
export const updateTransferController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;

    const params = transferIdSchema.safeParse(req.params);
    if (!params.success)
      throw new ValidationError("Validation errors", parseErrors(params.error.issues));

    const body = updateTransferSchema.safeParse(req.body);
    if (!body.success)
      throw new ValidationError("Validation errors", parseErrors(body.error.issues));

    const transfer = await updateTransfer(userId, params.data.id, body.data);
    res.status(200).json({ message: "Transfer updated successfully", transfer });
  } catch (error) {
    handleError(res, error, "updating transfer");
  }
};

/** DELETE /transfers/:id */
export const deleteTransferController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const v = transferIdSchema.safeParse(req.params);
    if (!v.success)
      throw new ValidationError("Validation errors", parseErrors(v.error.issues));

    await deleteTransfer(userId, v.data.id);
    res.status(200).json({ message: "Transfer deleted successfully" });
  } catch (error) {
    handleError(res, error, "deleting transfer");
  }
};
