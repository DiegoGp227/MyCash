"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, CheckCircle, XCircle } from "lucide-react";
import type { IGoal, IUpdateGoal, ICreateContribution } from "@/src/goals/types/goals.types";
import GoalDrawer from "./GoalDrawer";

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

const STATUS_LABELS: Record<IGoal["status"], string> = {
  ACTIVE: "Active",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const STATUS_COLORS: Record<IGoal["status"], string> = {
  ACTIVE: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20",
  COMPLETED: "text-primary-purple bg-purple-50 dark:bg-purple-900/20",
  CANCELLED: "text-hard-gray bg-gray-100 dark:bg-dark-bg",
};

interface GoalCardProps {
  goal: IGoal;
  onUpdate: (id: string, data: IUpdateGoal) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onContribute: (id: string, data: ICreateContribution) => Promise<void>;
}

export default function GoalCard({ goal, onUpdate, onDelete, onContribute }: GoalCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isContributing, setIsContributing] = useState(false);

  const pct = goal.targetAmount > 0
    ? Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
    : 0;

  const handleDelete = async () => {
    setIsDeleting(true);
    try { await onDelete(goal.id); } finally { setIsDeleting(false); }
  };

  const handleUpdate = async (data: IUpdateGoal) => {
    setIsUpdating(true);
    try { await onUpdate(goal.id, data); setIsEditOpen(false); } finally { setIsUpdating(false); }
  };

  const handleContribute = async (data: ICreateContribution) => {
    setIsContributing(true);
    try { await onContribute(goal.id, data); setIsContributeOpen(false); } finally { setIsContributing(false); }
  };

  const handleMarkCompleted = () => onUpdate(goal.id, { status: "COMPLETED" });
  const handleMarkCancelled = () => onUpdate(goal.id, { status: "CANCELLED" });
  const handleReactivate = () => onUpdate(goal.id, { status: "ACTIVE" });

  return (
    <>
      <div className="p-4 rounded border-2 border-primary-purple bg-white dark:bg-light-purple-bg flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {goal.icon && <span className="text-2xl shrink-0">{goal.icon}</span>}
            <div className="min-w-0">
              <p className="font-semibold dark:text-white truncate">{goal.name}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[goal.status]}`}>
                {STATUS_LABELS[goal.status]}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setIsEditOpen(true)}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
            >
              <Pencil size={14} className="text-hard-gray" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
            >
              <Trash2 size={14} className="text-error" />
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs text-hard-gray mb-1">
            <span>{fmt(goal.currentAmount)}</span>
            <span>{fmt(goal.targetAmount)}</span>
          </div>
          <div className="w-full h-2.5 bg-gray-200 dark:bg-dark-bg rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-primary-purple transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-hard-gray text-right">{pct.toFixed(0)}% completed</p>
        </div>

        {/* Dates */}
        {goal.endDate && (
          <p className="text-xs text-hard-gray">
            Deadline: {new Date(goal.endDate).toLocaleDateString("en-US")}
          </p>
        )}

        {/* Actions */}
        {goal.status === "ACTIVE" && (
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setIsContributeOpen(true)}
              className="flex items-center gap-1.5 flex-1 justify-center h-8 rounded border border-primary-purple text-primary-purple text-xs font-medium hover:bg-primary-purple/5 transition-colors"
            >
              <Plus size={13} /> Contribute
            </button>
            <button
              onClick={handleMarkCompleted}
              className="flex items-center gap-1 h-8 px-2 rounded border border-green-500 text-green-600 dark:text-green-400 text-xs hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
              title="Mark as completed"
            >
              <CheckCircle size={13} />
            </button>
            <button
              onClick={handleMarkCancelled}
              className="flex items-center gap-1 h-8 px-2 rounded border border-gray-300 dark:border-dark-border text-hard-gray text-xs hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
              title="Cancel goal"
            >
              <XCircle size={13} />
            </button>
          </div>
        )}

        {goal.status !== "ACTIVE" && (
          <button
            onClick={handleReactivate}
            className="h-8 rounded border border-primary-purple text-primary-purple text-xs font-medium hover:bg-primary-purple/5 transition-colors"
          >
            Reactivate
          </button>
        )}
      </div>

      <GoalDrawer
        isOpen={isEditOpen}
        mode="edit"
        goal={goal}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleUpdate}
        isLoading={isUpdating}
      />

      <GoalDrawer
        isOpen={isContributeOpen}
        mode="contribute"
        goalName={goal.name}
        onClose={() => setIsContributeOpen(false)}
        onSubmit={handleContribute}
        isLoading={isContributing}
      />
    </>
  );
}
