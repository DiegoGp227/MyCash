"use client";

import { useCategories } from "@/src/categories/hooks/useCategories";
import CategoryCard from "./CategoryCard";
import CategoryDrawer from "./CategoryDrawer";
import { useEffect } from "react";
import { X } from "lucide-react";
import type { CategoryFormInput } from "@/src/categories/schemas/category.schema";
import type { IUpdateCategory } from "@/src/categories/types/categories.types";

interface IContentCategoriesProps {
  type: "EXPENSE" | "INCOME";
  isDrawerOpen: boolean;
  onOpenDrawer: () => void;
  onDrawerClose: () => void;
}

export default function ContentCategories({
  type,
  isDrawerOpen,
  onOpenDrawer,
  onDrawerClose,
}: IContentCategoriesProps) {
  const {
    categories,
    clearError,
    createCategory,
    error,
    fetchCategories,
    deleteCategory,
    updateCategory,
    isCreating,
    isLoading,
  } = useCategories();

  useEffect(() => {
    fetchCategories(type);
  }, [fetchCategories, type]);

  const handleCreate = async (data: CategoryFormInput) => {
    await createCategory({
      name: data.name,
      color: data.color,
      icon: data.icon,
      type: data.type,
    });
    onDrawerClose();
  };

  const handleEdit = async (categoryId: string, data: IUpdateCategory) => {
    await updateCategory(categoryId, data);
  };

  const handleDelete = async (categoryId: string) => {
    await deleteCategory(categoryId);
  };

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="flex items-center justify-between bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm">
          <span>{error}</span>
          <button onClick={clearError} className="cursor-pointer">
            <X size={16} />
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-hard-gray text-lg">Cargando categorias...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="flex justify-center items-center py-10 gap-5">
          <p className="text-hard-gray text-lg">
            No hay categorias. Crea una nueva para comenzar.
          </p>
          <button onClick={onOpenDrawer} className="bg-primary-purple py-1 px-3 rounded text-white cursor-pointer hover:bg-primary-purple-hover transition-colors">Crea una</button>
        </div>
      ) : (
        <div className="flex gap-5 flex-wrap justify-center items-center">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CategoryDrawer
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
        onSubmit={handleCreate}
        mode="create"
        type={type}
        isLoading={isCreating}
      />
    </div>
  );
}
