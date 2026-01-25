import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  UnauthorizedError,
  TokenExpiredError,
  InvalidTokenError,
} from "../errors/400Errors.js";
import { AppError, InternalServerError } from "../errors/appError.js";

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError("No token provided");
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      throw new InvalidTokenError("Token format invalid. Use: Bearer <token>");
    }

    const token = parts[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    ) as JwtPayload;

    (req as AuthenticatedRequest).user = decoded;

    next();
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json(error.toJSON());
      return;
    }

    if (error instanceof jwt.TokenExpiredError) {
      const tokenError = new TokenExpiredError("Token has expired");
      res.status(tokenError.statusCode).json(tokenError.toJSON());
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      const invalidError = new InvalidTokenError("Invalid token");
      res.status(invalidError.statusCode).json(invalidError.toJSON());
      return;
    }

    const internalError = new InternalServerError("Authentication error");
    res.status(internalError.statusCode).json(internalError.toJSON());
  }
};
