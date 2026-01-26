import prisma from "../../db/prisma.js";
import {
  ResourceAlreadyExistsError,
  NotFoundError,
  ForbiddenError,
} from "../../errors/400Errors.js";
import {
  ICreateCategory,
  IUpdateCategory,
  ICategoryResponse,
} from "./categories.types.js";

const categorySelect = {
  id: true,
  name: true,
  color: true,
  icon: true,
  type: true,
  createdAt: true,
  updatedAt: true,
};

export const createCategory = async (
  userId: string,
  data: ICreateCategory,
): Promise<ICategoryResponse> => {
  const existingCategory = await prisma.category.findUnique({
    where: {
      userId_name_type: {
        userId,
        name: data.name,
        type: data.type,
      },
    },
  });

  if (existingCategory) {
    throw new ResourceAlreadyExistsError("Category", {
      name: data.name,
      type: data.type,
    });
  }

  const category = await prisma.category.create({
    data: {
      userId,
      name: data.name,
      color: data.color,
      icon: data.icon,
      type: data.type,
    },
    select: categorySelect,
  });

  return {
    ...category,
    subcategoriesCount: 0,
  };
};


export const getCategories = async (
  userId: string,
  type?: "INCOME" | "EXPENSE",
): Promise<ICategoryResponse[]> => {
  const categories = await prisma.category.findMany({
    where: {
      userId,
      ...(type && { type }),
    },
    select: {
      ...categorySelect,
      _count: {
        select: {
          subcategories: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });

  return categories.map(category => ({
    id: category.id,
    name: category.name,
    color: category.color,
    icon: category.icon,
    type: category.type,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
    subcategoriesCount: category._count.subcategories,
  }));
};

export const getCategoryById = async (
  userId: string,
  categoryId: string,
): Promise<ICategoryResponse> => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { ...categorySelect, userId: true },
  });

  if (!category) {
    throw new NotFoundError("Category");
  }

  if (category.userId !== userId) {
    throw new ForbiddenError("You don't have access to this category");
  }

  const { userId: _, ...data } = category;

  return {
    ...data,
    subcategoriesCount: 0,
  };
};

export const updateCategory = async (
  userId: string,
  categoryId: string,
  data: IUpdateCategory,
): Promise<ICategoryResponse> => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { userId: true, name: true, type: true },
  });

  if (!category) {
    throw new NotFoundError("Category");
  }

  if (category.userId !== userId) {
    throw new ForbiddenError("You don't have access to this category");
  }

  if (data.name && data.name !== category.name) {
    const existingCategory = await prisma.category.findUnique({
      where: {
        userId_name_type: {
          userId,
          name: data.name,
          type: category.type,
        },
      },
    });

    if (existingCategory) {
      throw new ResourceAlreadyExistsError("Category", {
        name: data.name,
        type: category.type,
      });
    }
  }

  const updatedCategory = await prisma.category.update({
    where: { id: categoryId },
    data,
    select: categorySelect,
  });

  return {
    ...updatedCategory,
    subcategoriesCount: 0,
  };
};


export const deleteCategory = async (
  userId: string,
  categoryId: string,
): Promise<void> => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { userId: true },
  });

  if (!category) {
    throw new NotFoundError("Category");
  }

  if (category.userId !== userId) {
    throw new ForbiddenError("You don't have access to this category");
  }

  await prisma.category.delete({
    where: { id: categoryId },
  });
};
