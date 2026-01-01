import { Request, Response } from "express";
// import { createUser } from "../../services/auth/signup.service";
import { ValidationError } from "../../errors/400Errors.js";
import { AppError, InternalServerError } from "../../errors/appError.js";
import { signupSchema } from "./auth.shema.js";
import { createUser } from "./auth.services.js";


/**
 * @route POST /api/signup
 * @body { email, password }
 * @returns { message, token, userInfo }
 */

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = signupSchema.safeParse(req.body);

    if (!validation.success) {
      const errors = validation.error.issues.reduce(
        (acc: Record<string, string>, err: any) => {
          acc[err.path.join(".")] = err.message;
          return acc;
        },
        {}
      );

      throw new ValidationError("Validation errors", errors);
    }

    const { user, token } = await createUser(validation.data);

    res.status(201).json({
      message: "User successfully created",
      token,
      userInfo: {
        userId: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("❌ Error in the signup:", error);

    if (error instanceof AppError) {
      res.status(error.statusCode).json(error.toJSON());
      return;
    }

    const internalError = new InternalServerError("Internal server error");
    res.status(internalError.statusCode).json(internalError.toJSON());
  }
};
