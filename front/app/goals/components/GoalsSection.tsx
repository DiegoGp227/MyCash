"use client";

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { useGoals } from "@/src/goals/hooks/useGoals";
import type { GoalStatus, ICreateGoal, IUpdateGoal, ICreateContribution } from "@/src/goals/types/goals.types";
import GoalCard from "./GoalCard";
import GoalDrawer from "./GoalDrawer";

const STATUS_TABS: { label: string; value: GoalStatus | "ALL" }[] = [
  { label: "Active", value: "ACTIVE" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "All", value: "ALL" },
];

export default function GoalsSection() {
  const [activeTab, setActiveTab] = useState<GoalStatus | "ALL">("ACTIVE");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    goals,
    isLoading,
    isCreating,
    error,
    fetchGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    addContribution,
    clearError,
  } = useGoals();

  useEffect(() => {
    fetchGoals(activeTab === "ALL" ? undefined : activeTab);
  }, [fetchGoals, activeTab]);

  const handleCreate = async (data: ICreateGoal) => {
    await createGoal(data);
    setIsDrawerOpen(false);
  };

  const handleUpdate = async (id: string, data: IUpdateGoal) => {
    await updateGoal(id, data);
  };

  const handleDelete = async (id: string) => {
    await deleteGoal(id);
  };

  const handleContribute = async (id: string, data: ICreateContribution) => {
    await addContribution(id, data);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Status tabs */}
      <div className="flex gap-1 p-1 rounded border-2 border-primary-purple bg-gray-bg dark:bg-light-purple-bg w-fit">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
              activeTab === tab.value
                ? "bg-primary-purple text-white"
                : "text-hard-gray hover:text-primary-purple dark:text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center justify-between p-3 rounded bg-red-50 dark:bg-red-900/20 border border-error text-error text-sm">
          <span>{error}</span>
          <button onClick={clearError}><X size={16} /></button>
        </div>
      )}

      {/* New goal button */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="flex items-center justify-center gap-2 h-10 w-full rounded border-2 border-dashed border-primary-purple text-primary-purple text-sm font-medium hover:bg-primary-purple/5 transition-colors"
      >
        <Plus size={16} />
        New Goal
      </button>

      {/* Goal cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-48 rounded border-2 border-primary-purple/30 bg-gray-bg dark:bg-light-purple-bg animate-pulse"
            />
          ))}
        </div>
      ) : goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2 text-hard-gray">
          <p className="font-medium">No goals in this category</p>
          <p className="text-sm">Create one with the button above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onContribute={handleContribute}
            />
          ))}
        </div>
      )}

      <GoalDrawer
        isOpen={isDrawerOpen}
        mode="create"
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleCreate}
        isLoading={isCreating}
      />
    </div>
  );
}
