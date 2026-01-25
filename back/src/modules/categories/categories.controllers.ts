import { Request, Response } from "express";
import { ValidationError } from "../../errors/400Errors.js";
import { AppError, InternalServerError } from "../../errors/appError.js";
import {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
} from "./categories.shema.js";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./categories.services.js";

/**
 * @route POST /categories
 * @body { name, color, icon?, type }
 * @returns { message, category }
 * @requires Authentication
 */
export const createCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;

    const validation = createCategorySchema.safeParse(req.body);

    if (!validation.success) {
      const errors = validation.error.issues.reduce(
        (acc: Record<string, string>, err) => {
          acc[err.path.join(".")] = err.message;
          return acc;
        },
        {}
      );
      throw new ValidationError("Validation errors", errors);
    }

    const category = await createCategory(userId, validation.data);

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("❌ Error creating category:", error);

    if (error instanceof AppError) {
      res.status(error.statusCode).json(error.toJSON());
      return;
    }

    const internalError = new InternalServerError("Internal server error");
    res.status(internalError.statusCode).json(internalError.toJSON());
  }
};

/**
 * @route GET /categories
 * @returns { categories }
 * @requires Authentication
 */
export const getCategoriesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;

    const categories = await getCategories(userId);

    res.status(200).json({ categories });
  } catch (error) {
    console.error("❌ Error getting categories:", error);

    if (error instanceof AppError) {
      res.status(error.statusCode).json(error.toJSON());
      return;
    }

    const internalError = new InternalServerError("Internal server error");
    res.status(internalError.statusCode).json(internalError.toJSON());
  }
};

/**
 * @route GET /categories/:id
 * @returns { category }
 * @requires Authentication
 */
export const getCategoryByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;

    const paramsValidation = categoryIdSchema.safeParse(req.params);

    if (!paramsValidation.success) {
      const errors = paramsValidation.error.issues.reduce(
        (acc: Record<string, string>, err) => {
          acc[err.path.join(".")] = err.message;
          return acc;
        },
        {}
      );
      throw new ValidationError("Validation errors", errors);
    }

    const category = await getCategoryById(userId, paramsValidation.data.id);

    res.status(200).json({ category });
  } catch (error) {
    console.error("❌ Error getting category:", error);

    if (error instanceof AppError) {
      res.status(error.statusCode).json(error.toJSON());
      return;
    }

    const internalError = new InternalServerError("Internal server error");
    res.status(internalError.statusCode).json(internalError.toJSON());
  }
};

/**
 * @route PUT /categories/:id
 * @body { name?, color?, icon? }
 * @returns { message, category }
 * @requires Authentication
 */
export const updateCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;

    const paramsValidation = categoryIdSchema.safeParse(req.params);

    if (!paramsValidation.success) {
      const errors = paramsValidation.error.issues.reduce(
        (acc: Record<string, string>, err) => {
          acc[err.path.join(".")] = err.message;
          return acc;
        },
        {}
      );
      throw new ValidationError("Validation errors", errors);
    }

    const bodyValidation = updateCategorySchema.safeParse(req.body);

    if (!bodyValidation.success) {
      const errors = bodyValidation.error.issues.reduce(
        (acc: Record<string, string>, err) => {
          acc[err.path.join(".")] = err.message;
          return acc;
        },
        {}
      );
      throw new ValidationError("Validation errors", errors);
    }

    const category = await updateCategory(
      userId,
      paramsValidation.data.id,
      bodyValidation.data
    );

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("❌ Error updating category:", error);

    if (error instanceof AppError) {
      res.status(error.statusCode).json(error.toJSON());
      return;
    }

    const internalError = new InternalServerError("Internal server error");
    res.status(internalError.statusCode).json(internalError.toJSON());
  }
};

/**
 * @route DELETE /categories/:id
 * @returns { message }
 * @requires Authentication
 */
export const deleteCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.user!;

    const paramsValidation = categoryIdSchema.safeParse(req.params);

    if (!paramsValidation.success) {
      const errors = paramsValidation.error.issues.reduce(
        (acc: Record<string, string>, err) => {
          acc[err.path.join(".")] = err.message;
          return acc;
        },
        {}
      );
      throw new ValidationError("Validation errors", errors);
    }

    await deleteCategory(userId, paramsValidation.data.id);

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting category:", error);

    if (error instanceof AppError) {
      res.status(error.statusCode).json(error.toJSON());
      return;
    }

    const internalError = new InternalServerError("Internal server error");
    res.status(internalError.statusCode).json(internalError.toJSON());
  }
};
