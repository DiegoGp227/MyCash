import { Request, Response } from "express";
import { ZodIssue } from "zod";
import { ValidationError } from "../../errors/400Errors.js";
import { AppError, InternalServerError } from "../../errors/appError.js";
import {
  createAccountSchema,
  updateAccountSchema,
  accountIdSchema,
} from "./accounts.shema.js";
import {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
} from "./accounts.services.js";

const parseValidationErrors = (issues: ZodIssue[]) =>
  issues.reduce((acc: Record<string, string>, err) => {
    acc[err.path.map(String).join(".")] = err.message;
    return acc;
  }, {});

const handleError = (res: Response, error: unknown, context: string) => {
  console.error(`❌ Error ${context}:`, error);
  if (error instanceof AppError) {
    res.status(error.statusCode).json(error.toJSON());
    return;
  }
  const internal = new InternalServerError("Internal server error");
  res.status(internal.statusCode).json(internal.toJSON());
};

/**
 * @route POST /accounts
 * @body { name, type, balance, color?, icon? }
 * @requires Authentication
 */
export const createAccountController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;

    const validation = createAccountSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError("Validation errors", parseValidationErrors(validation.error.issues));
    }

    const account = await createAccount(userId, validation.data);
    res.status(201).json({ message: "Account created successfully", account });
  } catch (error) {
    handleError(res, error, "creating account");
  }
};

/**
 * @route GET /accounts
 * @requires Authentication
 */
export const getAccountsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const accounts = await getAccounts(userId);
    res.status(200).json({ accounts });
  } catch (error) {
    handleError(res, error, "getting accounts");
  }
};

/**
 * @route GET /accounts/:id
 * @requires Authentication
 */
export const getAccountByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;

    const paramsValidation = accountIdSchema.safeParse(req.params);
    if (!paramsValidation.success) {
      throw new ValidationError("Validation errors", parseValidationErrors(paramsValidation.error.issues));
    }

    const account = await getAccountById(userId, paramsValidation.data.id);
    res.status(200).json({ account });
  } catch (error) {
    handleError(res, error, "getting account");
  }
};

/**
 * @route PATCH /accounts/:id
 * @body { name?, color?, icon?, balance? }
 * @requires Authentication
 */
export const updateAccountController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;

    const paramsValidation = accountIdSchema.safeParse(req.params);
    if (!paramsValidation.success) {
      throw new ValidationError("Validation errors", parseValidationErrors(paramsValidation.error.issues));
    }

    const bodyValidation = updateAccountSchema.safeParse(req.body);
    if (!bodyValidation.success) {
      throw new ValidationError("Validation errors", parseValidationErrors(bodyValidation.error.issues));
    }

    const account = await updateAccount(userId, paramsValidation.data.id, bodyValidation.data);
    res.status(200).json({ message: "Account updated successfully", account });
  } catch (error) {
    handleError(res, error, "updating account");
  }
};

/**
 * @route DELETE /accounts/:id
 * @requires Authentication
 */
export const deleteAccountController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;

    const paramsValidation = accountIdSchema.safeParse(req.params);
    if (!paramsValidation.success) {
      throw new ValidationError("Validation errors", parseValidationErrors(paramsValidation.error.issues));
    }

    await deleteAccount(userId, paramsValidation.data.id);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    handleError(res, error, "deleting account");
  }
};
