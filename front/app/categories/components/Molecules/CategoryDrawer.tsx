"use client";

import { X } from "lucide-react";
import Portal from "../Atoms/Portal";
import Backdrop from "../Atoms/Backdrop";
import CategoryForm from "./CategoryForm";
import type { CategoryFormInput } from "@/src/categories/schemas/category.schema";
import type { CategoryType } from "@/src/categories/types/categories.types";

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormInput) => void;
  mode: "create" | "edit";
  type: CategoryType;
  defaultValues?: Partial<CategoryFormInput>;
  isLoading?: boolean;
}

export default function CategoryDrawer({
  isOpen,
  onClose,
  onSubmit,
  mode,
  type,
  defaultValues,
  isLoading,
}: CategoryDrawerProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <Backdrop onClick={onClose} />
      <div
        className="fixed top-0 right-0 h-full w-full md:max-w-md bg-white dark:bg-dark-surface z-50 shadow-xl flex flex-col"
        style={{ animation: "slideInFromRight 0.3s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-dark-border sticky top-0 bg-white dark:bg-dark-surface">
          <h2 className="text-xl font-bold dark:text-white">
            {mode === "create" ? "Nueva Categoria" : "Editar Categoria"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-bg cursor-pointer transition-colors"
          >
            <X className="dark:text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          <CategoryForm
            onSubmit={onSubmit}
            onCancel={onClose}
            defaultValues={defaultValues}
            isLoading={isLoading}
            submitLabel={mode === "create" ? "Crear" : "Guardar"}
            type={type}
          />
        </div>
      </div>
    </Portal>
  );
}
