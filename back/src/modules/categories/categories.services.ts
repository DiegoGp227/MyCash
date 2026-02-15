import prisma from "../../db/prisma.js";
import {
  ResourceAlreadyExistsError,
  NotFoundError,
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
  isActive: true,
  deletedAt: true,
  createdAt: true,
  updatedAt: true,
};

export const createCategory = async (
  userId: string,
  data: ICreateCategory,
): Promise<ICategoryResponse> => {
  const existingCategory = await prisma.category.findFirst({
    where: {
      userId,
      name: data.name,
      type: data.type,
      isActive: true,
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
      isActive: true,
      ...(type && { type }),
    },
    select: {
      ...categorySelect,
      _count: {
        select: {
          subcategories: {
            where: { isActive: true },
          },
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
    isActive: category.isActive,
    deletedAt: category.deletedAt,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
    subcategoriesCount: category._count.subcategories,
  }));
};

export const getCategoryById = async (
  userId: string,
  categoryId: string,
): Promise<ICategoryResponse> => {
  const category = await prisma.category.findFirst({
    where: { id: categoryId, isActive: true },
    select: { ...categorySelect, userId: true },
  });

  if (!category || category.userId !== userId) {
    throw new NotFoundError("Category");
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
  const category = await prisma.category.findFirst({
    where: { id: categoryId, isActive: true },
    select: { userId: true, name: true, type: true },
  });

  if (!category || category.userId !== userId) {
    throw new NotFoundError("Category");
  }

  if (data.name && data.name !== category.name) {
    const existingCategory = await prisma.category.findFirst({
      where: {
        userId,
        name: data.name,
        type: category.type,
        isActive: true,
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
  const category = await prisma.category.findFirst({
    where: { id: categoryId, isActive: true },
    select: { userId: true },
  });

  if (!category || category.userId !== userId) {
    throw new NotFoundError("Category");
  }

  const now = new Date();

  await prisma.$transaction([
    prisma.subcategory.updateMany({
      where: { categoryId, isActive: true },
      data: { isActive: false, deletedAt: now },
    }),
    prisma.category.update({
      where: { id: categoryId },
      data: { isActive: false, deletedAt: now },
    }),
  ]);
};
