import { Router } from "express";
import dbCheck from "../modules/test/test.js";
import { login, signup } from "../modules/auth/auth.controllers.js";
import {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "../modules/categories/categories.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const router: Router = Router();

// Test routes
router.get("/db", dbCheck);

// Auth routes
router.post("/signup", signup);
router.post("/login", login);

// Categories routes (protected)
router.post("/categories", authMiddleware, createCategoryController);
router.get("/categories", authMiddleware, getCategoriesController);
router.get("/categories/:id", authMiddleware, getCategoryByIdController);
router.put("/categories/:id", authMiddleware, updateCategoryController);
router.delete("/categories/:id", authMiddleware, deleteCategoryController);
