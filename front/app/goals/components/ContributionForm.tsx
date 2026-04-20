"use client";

import { useForm } from "react-hook-form";
import type { ICreateContribution } from "@/src/goals/types/goals.types";

interface ContributionFormData {
  amount: number;
  note?: string;
}

interface ContributionFormProps {
  onSubmit: (data: ICreateContribution) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ContributionForm({ onSubmit, onCancel, isLoading }: ContributionFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ContributionFormData>();

  const handleCreate = async (data: ContributionFormData) => {
    await onSubmit({ amount: Number(data.amount), note: data.note || undefined });
  };

  return (
    <form onSubmit={handleSubmit(handleCreate)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Contribution amount</label>
        <input
          type="number"
          min={1}
          step="any"
          placeholder="0"
          {...register("amount", {
            required: "Amount is required",
            min: { value: 1, message: "Must be greater than 0" },
            valueAsNumber: true,
          })}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
        />
        {errors.amount && <p className="text-error text-xs">{errors.amount.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Note (optional)</label>
        <input
          type="text"
          placeholder="E.g.: January savings"
          {...register("note")}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 h-10 rounded border border-gray-300 dark:border-dark-border text-sm dark:text-white hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 h-10 rounded bg-primary-purple text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Add"}
        </button>
      </div>
    </form>
  );
}
