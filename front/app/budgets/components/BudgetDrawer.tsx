"use client";

import { X } from "lucide-react";
import Portal from "@/app/categories/components/Atoms/Portal";
import Backdrop from "@/app/categories/components/Atoms/Backdrop";
import BudgetForm from "./BudgetForm";
import type { ICreateBudget, IUpdateBudget } from "@/src/budgets/types/budgets.types";

interface BudgetDrawerCreateProps {
  isOpen: boolean;
  mode: "create";
  month: number;
  year: number;
  onClose: () => void;
  onSubmit: (data: ICreateBudget) => Promise<void>;
  isLoading?: boolean;
}

interface BudgetDrawerEditProps {
  isOpen: boolean;
  mode: "edit";
  defaultAmount: number;
  onClose: () => void;
  onSubmit: (data: IUpdateBudget) => Promise<void>;
  isLoading?: boolean;
}

type BudgetDrawerProps = BudgetDrawerCreateProps | BudgetDrawerEditProps;

export default function BudgetDrawer(props: BudgetDrawerProps) {
  if (!props.isOpen) return null;

  return (
    <Portal>
      <Backdrop onClick={props.onClose} />
      <div
        className="fixed top-0 right-0 h-full w-full md:max-w-md bg-white dark:bg-dark-surface z-50 shadow-xl flex flex-col"
        style={{ animation: "slideInFromRight 0.3s ease-out" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-dark-border sticky top-0 bg-white dark:bg-dark-surface">
          <h2 className="text-xl font-bold dark:text-white">
            {props.mode === "create" ? "Nuevo Presupuesto" : "Editar Presupuesto"}
          </h2>
          <button
            onClick={props.onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-bg cursor-pointer transition-colors"
          >
            <X className="dark:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {props.mode === "create" ? (
            <BudgetForm
              mode="create"
              month={props.month}
              year={props.year}
              onSubmit={props.onSubmit}
              onCancel={props.onClose}
              isLoading={props.isLoading}
            />
          ) : (
            <BudgetForm
              mode="edit"
              defaultAmount={props.defaultAmount}
              onSubmit={props.onSubmit}
              onCancel={props.onClose}
              isLoading={props.isLoading}
            />
          )}
        </div>
      </div>
    </Portal>
  );
}
