"use client";

import { X } from "lucide-react";
import Portal from "@/app/categories/components/Atoms/Portal";
import Backdrop from "@/app/categories/components/Atoms/Backdrop";
import GoalForm from "./GoalForm";
import ContributionForm from "./ContributionForm";
import type { IGoal, ICreateGoal, IUpdateGoal, ICreateContribution } from "@/src/goals/types/goals.types";

type DrawerMode = "create" | "edit" | "contribute";

interface GoalDrawerBaseProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
}

interface GoalDrawerCreateProps extends GoalDrawerBaseProps {
  mode: "create";
  onSubmit: (data: ICreateGoal) => Promise<void>;
}

interface GoalDrawerEditProps extends GoalDrawerBaseProps {
  mode: "edit";
  goal: IGoal;
  onSubmit: (data: IUpdateGoal) => Promise<void>;
}

interface GoalDrawerContributeProps extends GoalDrawerBaseProps {
  mode: "contribute";
  goalName: string;
  onSubmit: (data: ICreateContribution) => Promise<void>;
}

type GoalDrawerProps = GoalDrawerCreateProps | GoalDrawerEditProps | GoalDrawerContributeProps;

const titles: Record<DrawerMode, string> = {
  create: "Nueva Meta",
  edit: "Editar Meta",
  contribute: "Agregar Aporte",
};

export default function GoalDrawer(props: GoalDrawerProps) {
  if (!props.isOpen) return null;

  return (
    <Portal>
      <Backdrop onClick={props.onClose} />
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-dark-surface z-50 shadow-xl flex flex-col"
        style={{ animation: "slideInFromRight 0.3s ease-out" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-dark-border sticky top-0 bg-white dark:bg-dark-surface">
          <div>
            <h2 className="text-xl font-bold dark:text-white">{titles[props.mode]}</h2>
            {props.mode === "contribute" && (
              <p className="text-sm text-hard-gray">{props.goalName}</p>
            )}
          </div>
          <button
            onClick={props.onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-bg cursor-pointer transition-colors"
          >
            <X className="dark:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {props.mode === "create" && (
            <GoalForm
              mode="create"
              onSubmit={props.onSubmit}
              onCancel={props.onClose}
              isLoading={props.isLoading}
            />
          )}
          {props.mode === "edit" && (
            <GoalForm
              mode="edit"
              goal={props.goal}
              onSubmit={props.onSubmit}
              onCancel={props.onClose}
              isLoading={props.isLoading}
            />
          )}
          {props.mode === "contribute" && (
            <ContributionForm
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
