"use client";

import { useEffect, useMemo } from "react";
import { useCategories } from "@/src/categories/hooks/useCategories";
import GerelInfoDiv from "./GerelInfoDiv";

export default function GeneralCategories() {
  const { categories, fetchCategories } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const stats = useMemo(() => {
    const total = categories.length;
    const expense = categories.filter((c) => c.type === "EXPENSE").length;
    const income = categories.filter((c) => c.type === "INCOME").length;
    const mostUsed = categories.length > 0 ? categories[0].name : "N/A";

    return { total, expense, income, mostUsed };
  }, [categories]);

  return (
    <div className="flex w-full justify-center gap-20">
      <GerelInfoDiv title="Total Categorias" content={stats.total} />
      <GerelInfoDiv title="Categorias de Egreso" content={stats.expense} />
      <GerelInfoDiv title="Categorias de Ingreso" content={stats.income} />
      <GerelInfoDiv title="Categoria Mas Usada" content={stats.mostUsed} />
    </div>
  );
}
