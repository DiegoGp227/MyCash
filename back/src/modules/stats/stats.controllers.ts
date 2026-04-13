import { Request, Response } from "express";
import { AppError, InternalServerError } from "../../errors/appError.js";
import { getDashboardSummary } from "./stats.services.js";

export const getDashboardSummaryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;
    const summary = await getDashboardSummary(userId);
    res.status(200).json({ summary });
  } catch (error) {
    console.error("❌ Error getting dashboard summary:", error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json(error.toJSON());
      return;
    }
    const e = new InternalServerError("Internal server error");
    res.status(e.statusCode).json(e.toJSON());
  }
};
