import { Router } from "express";
import dbCheck from "../modules/test/test.js";
import { login, signup, updateUserController } from "../modules/auth/auth.controllers.js";
import {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "../modules/categories/categories.controllers.js";
import {
  createAccountController,
  getAccountsController,
  getAccountByIdController,
  updateAccountController,
  deleteAccountController,
} from "../modules/accounts/accounts.controllers.js";
import {
  createTransactionController,
  getTransactionsController,
  getTransactionByIdController,
  updateTransactionController,
  deleteTransactionController,
} from "../modules/transactions/transactions.controllers.js";
import { getDashboardSummaryController } from "../modules/stats/stats.controllers.js";
import {
  createTransferController,
  getTransfersController,
  getTransferByIdController,
  updateTransferController,
  deleteTransferController,
} from "../modules/transfers/transfers.controllers.js";
import {
  createDebtController,
  getDebtsController,
  getDebtByIdController,
  updateDebtController,
  deleteDebtController,
  addPaymentController,
  deletePaymentController,
} from "../modules/debts/debts.controllers.js";
import {
  createGoalController,
  getGoalsController,
  getGoalByIdController,
  updateGoalController,
  deleteGoalController,
  addContributionController,
  deleteContributionController,
} from "../modules/goals/goals.controllers.js";
import {
  createBudgetController,
  getBudgetsController,
  getBudgetByIdController,
  updateBudgetController,
  deleteBudgetController,
} from "../modules/budgets/budgets.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const router: Router = Router();

// Test routes
router.get("/db", dbCheck);

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.patch("/users/me", authMiddleware, updateUserController);

// Categories routes (protected)
router.post("/categories", authMiddleware, createCategoryController);
router.get("/categories", authMiddleware, getCategoriesController);
router.get("/categories/:id", authMiddleware, getCategoryByIdController);
router.patch("/categories/:id", authMiddleware, updateCategoryController);
router.delete("/categories/:id", authMiddleware, deleteCategoryController);

// Accounts routes (protected)
router.post("/accounts", authMiddleware, createAccountController);
router.get("/accounts", authMiddleware, getAccountsController);
router.get("/accounts/:id", authMiddleware, getAccountByIdController);
router.patch("/accounts/:id", authMiddleware, updateAccountController);
router.delete("/accounts/:id", authMiddleware, deleteAccountController);

// Stats routes (protected)
router.get("/stats/summary", authMiddleware, getDashboardSummaryController);

// Transactions routes (protected)
router.post("/transactions", authMiddleware, createTransactionController);
router.get("/transactions", authMiddleware, getTransactionsController);
router.get("/transactions/:id", authMiddleware, getTransactionByIdController);
router.patch("/transactions/:id", authMiddleware, updateTransactionController);
router.delete("/transactions/:id", authMiddleware, deleteTransactionController);

// Transfers routes (protected)
router.post("/transfers", authMiddleware, createTransferController);
router.get("/transfers", authMiddleware, getTransfersController);
router.get("/transfers/:id", authMiddleware, getTransferByIdController);
router.patch("/transfers/:id", authMiddleware, updateTransferController);
router.delete("/transfers/:id", authMiddleware, deleteTransferController);

// Debts routes (protected)
router.post("/debts", authMiddleware, createDebtController);
router.get("/debts", authMiddleware, getDebtsController);
router.get("/debts/:id", authMiddleware, getDebtByIdController);
router.patch("/debts/:id", authMiddleware, updateDebtController);
router.delete("/debts/:id", authMiddleware, deleteDebtController);
router.post("/debts/:id/payments", authMiddleware, addPaymentController);
router.delete("/debts/:id/payments/:paymentId", authMiddleware, deletePaymentController);

// Goals routes (protected)
router.post("/goals", authMiddleware, createGoalController);
router.get("/goals", authMiddleware, getGoalsController);
router.get("/goals/:id", authMiddleware, getGoalByIdController);
router.patch("/goals/:id", authMiddleware, updateGoalController);
router.delete("/goals/:id", authMiddleware, deleteGoalController);
router.post("/goals/:id/contributions", authMiddleware, addContributionController);
router.delete("/goals/:id/contributions/:contributionId", authMiddleware, deleteContributionController);

// Budgets routes (protected)
router.post("/budgets", authMiddleware, createBudgetController);
router.get("/budgets", authMiddleware, getBudgetsController);
router.get("/budgets/:id", authMiddleware, getBudgetByIdController);
router.patch("/budgets/:id", authMiddleware, updateBudgetController);
router.delete("/budgets/:id", authMiddleware, deleteBudgetController);
