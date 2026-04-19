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
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
      <GerelInfoDiv title="Total Categories" content={stats.total} />
      <GerelInfoDiv title="Expense Categories" content={stats.expense} />
      <GerelInfoDiv title="Income Categories" content={stats.income} />
      <GerelInfoDiv title="Most Used" content={stats.mostUsed} />
    </div>
  );
}
