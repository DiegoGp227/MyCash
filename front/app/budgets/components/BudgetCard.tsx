"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { IBudget, IUpdateBudget } from "@/src/budgets/types/budgets.types";
import BudgetDrawer from "./BudgetDrawer";
import { resolveIcon } from "@/src/utils/resolveIcon";

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

interface BudgetCardProps {
  budget: IBudget;
  onUpdate: (id: string, data: IUpdateBudget) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function BudgetCard({ budget, onUpdate, onDelete }: BudgetCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const pct = budget.amount > 0 ? Math.min((budget.spent / budget.amount) * 100, 100) : 0;
  const isOver = budget.spent > budget.amount;
  const remaining = budget.amount - budget.spent;

  const label = budget.subcategory?.name ?? budget.category?.name ?? "Sin nombre";
  const color = budget.subcategory?.color ?? budget.category?.color ?? "#8B5CF6";
  const icon = budget.subcategory?.icon ?? budget.category?.icon;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(budget.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (data: IUpdateBudget) => {
    await onUpdate(budget.id, data);
    setIsEditOpen(false);
  };

  return (
    <>
      <div className="p-4 rounded border-2 border-primary-purple bg-white dark:bg-light-purple-bg flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ backgroundColor: color }}
            >
              {resolveIcon(icon, label.charAt(0).toUpperCase())}
            </div>
            <span className="font-semibold dark:text-white truncate">{label}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsEditOpen(true)}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
            >
              <Pencil size={15} className="text-hard-gray" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
            >
              <Trash2 size={15} className="text-error" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-1">
          <div className="w-full h-2.5 bg-gray-200 dark:bg-dark-bg rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${isOver ? "bg-error" : "bg-primary-purple"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-hard-gray">
            <span>Spent: <span className={isOver ? "text-error font-semibold" : ""}>{fmt(budget.spent)}</span></span>
            <span>Limit: {fmt(budget.amount)}</span>
          </div>
        </div>

        {/* Remaining */}
        <p className={`text-sm font-medium ${isOver ? "text-error" : "text-green-600 dark:text-green-400"}`}>
          {isOver
            ? `Exceeded by ${fmt(Math.abs(remaining))}`
            : `Available: ${fmt(remaining)}`}
        </p>
      </div>

      <BudgetDrawer
        isOpen={isEditOpen}
        mode="edit"
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleUpdate}
        defaultAmount={budget.amount}
      />
    </>
  );
}
