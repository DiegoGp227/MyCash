"use client";

import { useCategories } from "@/src/categories/hooks/useCategories";
import CategoryCard from "./CategoryCard";
import { useEffect } from "react";

interface IContentCategoriesProps {
  type: "EXPENSE" | "INCOME";
}

export default function ContentCategories({ type }: IContentCategoriesProps) {
  const {
    categories,
    // clearError,
    // createCategory,
    // error,
    fetchCategories,
    // isCreating,
    // isLoading,
    // isUpdating,
    // updateCategory,
  } = useCategories();

  useEffect(() => {
    fetchCategories(type);
  }, [fetchCategories, type]);

  return (
    <div className="flex gap-5 flex-wrap justify-center items-center">
      {categories.map((category) => (
        <CategoryCard
          titleCategory={category.name}


          subCategoriesNumber={4}
        />
      ))}
      <CategoryCard subCategoriesNumber={4} titleCategory="Salario" />
      <CategoryCard subCategoriesNumber={4} titleCategory="Salario" />
      <CategoryCard subCategoriesNumber={4} titleCategory="Salario" />
      <CategoryCard subCategoriesNumber={4} titleCategory="Salario" />
      <CategoryCard subCategoriesNumber={4} titleCategory="Salario" />
      <CategoryCard subCategoriesNumber={4} titleCategory="Salario" />
    </div>
  );
}
