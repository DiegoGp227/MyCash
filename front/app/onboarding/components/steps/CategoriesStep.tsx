"use client";

import { useState } from "react";
import { categoriesService } from "@/src/categories/services/categoriesService";
import { ICreateCategory } from "@/src/categories/types/categories.types";

interface PresetCategory extends ICreateCategory {
  emoji: string;
}

const PRESET_EXPENSES: PresetCategory[] = [
  { name: "Food", color: "#22c55e", emoji: "🍔", type: "EXPENSE" },
  { name: "Transport", color: "#3b82f6", emoji: "🚗", type: "EXPENSE" },
  { name: "Housing", color: "#f97316", emoji: "🏠", type: "EXPENSE" },
  { name: "Health", color: "#ef4444", emoji: "🏥", type: "EXPENSE" },
  { name: "Education", color: "#a855f7", emoji: "📚", type: "EXPENSE" },
  { name: "Entertainment", color: "#ec4899", emoji: "🎮", type: "EXPENSE" },
  { name: "Clothing", color: "#eab308", emoji: "👕", type: "EXPENSE" },
  { name: "Utilities", color: "#06b6d4", emoji: "💡", type: "EXPENSE" },
  { name: "Pets", color: "#84cc16", emoji: "🐾", type: "EXPENSE" },
];

const PRESET_INCOMES: PresetCategory[] = [
  { name: "Salary", color: "#22c55e", emoji: "💰", type: "INCOME" },
  { name: "Freelance", color: "#3b82f6", emoji: "💻", type: "INCOME" },
  { name: "Investments", color: "#a855f7", emoji: "📈", type: "INCOME" },
  { name: "Own business", color: "#f97316", emoji: "🏪", type: "INCOME" },
  { name: "Other income", color: "#6b7280", emoji: "💵", type: "INCOME" },
];

interface CategoriesStepProps {
  onNext: (count: number) => void;
  onSkip: () => void;
}

export default function CategoriesStep({ onNext, onSkip }: CategoriesStepProps) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["Food", "Transport", "Salary"])
  );
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const toggle = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const handleCreate = async () => {
    if (selected.size === 0) {
      onSkip();
      return;
    }

    setIsLoading(true);
    setApiError(null);

    const allPresets = [...PRESET_EXPENSES, ...PRESET_INCOMES];
    const toCreate = allPresets.filter((c) => selected.has(c.name));

    try {
      await Promise.all(
        toCreate.map(({ emoji: _emoji, ...cat }) =>
          categoriesService.createCategory(cat)
        )
      );
      onNext(toCreate.length);
    } catch {
      setApiError("There was a problem creating some categories. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const CategoryChip = ({ cat }: { cat: PresetCategory }) => {
    const isSelected = selected.has(cat.name);
    return (
      <button
        type="button"
        onClick={() => toggle(cat.name)}
        disabled={isLoading}
        className={`flex items-center gap-2 px-3 py-2 rounded-full border-2 text-sm font-medium transition-all cursor-pointer ${
          isSelected
            ? "border-primary-purple bg-primary-purple/10 text-hard-gray"
            : "border-gray-700 text-gray-400 hover:border-gray-500"
        }`}
      >
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: cat.color }}
        />
        <span>{cat.emoji}</span>
        <span>{cat.name}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-hard-gray">Starter categories</h2>
        <p className="text-gray-400 text-sm">
          Select the ones you use regularly. You can add more later.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Expenses</p>
          <div className="flex flex-wrap gap-2">
            {PRESET_EXPENSES.map((cat) => (
              <CategoryChip key={cat.name} cat={cat} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Income</p>
          <div className="flex flex-wrap gap-2">
            {PRESET_INCOMES.map((cat) => (
              <CategoryChip key={cat.name} cat={cat} />
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center">
        {selected.size} categor{selected.size !== 1 ? "ies" : "y"} selected
      </p>

      {apiError && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm">
          {apiError}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onSkip}
          disabled={isLoading}
          className="flex-1 py-3 rounded border-2 border-gray-700 text-gray-400 hover:border-gray-500 font-semibold transition-colors disabled:opacity-50"
        >
          Skip
        </button>
        <button
          type="button"
          onClick={handleCreate}
          disabled={isLoading || selected.size === 0}
          className="flex-1 py-3 rounded bg-primary-purple text-white font-semibold hover:bg-primary-purple-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? "Creating..."
            : `Create ${selected.size > 0 ? selected.size : ""} categor${selected.size !== 1 ? "ies" : "y"}`}
        </button>
      </div>
    </div>
  );
}
