import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { InvalidTokenError, UnauthorizedError } from "../errors/400Errors";


export interface AuthPayload {
  id: string;
  email: string;
  role: string;
}

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError("Authorization header missing");
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new InvalidTokenError("Token format invalid. Use: Bearer <token>");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    const { id, email, role } = decoded as AuthPayload;

    if (!id || !email || !role) {
      throw new InvalidTokenError("Token payload is invalid");
    }

    req.user = {
      id,
      email,
      role
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new InvalidTokenError("Token has expired"));
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      next(new InvalidTokenError("Invalid or malformed token"));
      return;
    }

    next(error);
  }
};
