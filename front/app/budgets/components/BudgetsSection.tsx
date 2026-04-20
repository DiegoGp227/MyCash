"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useBudgets } from "@/src/budgets/hooks/useBudgets";
import type { ICreateBudget, IUpdateBudget } from "@/src/budgets/types/budgets.types";
import BudgetCard from "./BudgetCard";
import BudgetDrawer from "./BudgetDrawer";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function BudgetsSection() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    budgets,
    isLoading,
    isCreating,
    error,
    fetchBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
    clearError,
  } = useBudgets();

  useEffect(() => {
    fetchBudgets(month, year);
  }, [fetchBudgets, month, year]);

  const prevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const handleCreate = async (data: ICreateBudget) => {
    await createBudget(data);
    setIsDrawerOpen(false);
  };

  const handleUpdate = async (id: string, data: IUpdateBudget) => {
    await updateBudget(id, data);
  };

  const handleDelete = async (id: string) => {
    await deleteBudget(id);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Month navigator */}
      <div className="flex items-center justify-between p-4 rounded border-2 border-primary-purple bg-gray-bg dark:bg-light-purple-bg">
        <button
          onClick={prevMonth}
          className="p-2 rounded hover:bg-white dark:hover:bg-dark-bg transition-colors"
        >
          <ChevronLeft size={20} className="dark:text-white" />
        </button>
        <span className="font-bold text-lg dark:text-white">
          {MONTHS[month - 1]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="p-2 rounded hover:bg-white dark:hover:bg-dark-bg transition-colors"
        >
          <ChevronRight size={20} className="dark:text-white" />
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center justify-between p-3 rounded bg-red-50 dark:bg-red-900/20 border border-error text-error text-sm">
          <span>{error}</span>
          <button onClick={clearError}><X size={16} /></button>
        </div>
      )}

      {/* New budget button */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="flex items-center justify-center gap-2 h-10 w-full rounded border-2 border-dashed border-primary-purple text-primary-purple text-sm font-medium hover:bg-primary-purple/5 transition-colors"
      >
        <Plus size={16} />
        New Budget
      </button>

      {/* Budget cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-32 rounded border-2 border-primary-purple/30 bg-gray-bg dark:bg-light-purple-bg animate-pulse"
            />
          ))}
        </div>
      ) : budgets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2 text-hard-gray">
          <p className="font-medium">No budgets for this period</p>
          <p className="text-sm">Create one with the button above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <BudgetDrawer
        isOpen={isDrawerOpen}
        mode="create"
        month={month}
        year={year}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleCreate}
        isLoading={isCreating}
      />
    </div>
  );
}
