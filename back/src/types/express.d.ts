import { Request } from "express";
import { AuthPayload } from "../middlewares/auth.middleware";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user: AuthPayload;
}

export { AuthPayload };
