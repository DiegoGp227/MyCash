"use client";

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { useDebts } from "@/src/debts/hooks/useDebts";
import type { DebtStatus, ICreateDebt, IUpdateDebt, ICreatePayment } from "@/src/debts/types/debts.types";
import DebtCard from "./DebtCard";
import DebtDrawer from "./DebtDrawer";

const STATUS_TABS: { label: string; value: DebtStatus | "ALL" }[] = [
  { label: "Active", value: "ACTIVE" },
  { label: "Overdue", value: "OVERDUE" },
  { label: "Paid", value: "PAID" },
  { label: "All", value: "ALL" },
];

export default function DebtsSection() {
  const [activeTab, setActiveTab] = useState<DebtStatus | "ALL">("ACTIVE");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    debts,
    isLoading,
    isCreating,
    error,
    fetchDebts,
    createDebt,
    updateDebt,
    deleteDebt,
    addPayment,
    clearError,
  } = useDebts();

  useEffect(() => {
    fetchDebts(activeTab === "ALL" ? undefined : activeTab);
  }, [fetchDebts, activeTab]);

  const handleCreate = async (data: ICreateDebt) => {
    await createDebt(data);
    setIsDrawerOpen(false);
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

      {/* New debt button */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="flex items-center justify-center gap-2 h-10 w-full rounded border-2 border-dashed border-primary-purple text-primary-purple text-sm font-medium hover:bg-primary-purple/5 transition-colors"
      >
        <Plus size={16} />
        New Debt
      </button>

      {/* Debt cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-48 rounded border-2 border-primary-purple/30 bg-gray-bg dark:bg-light-purple-bg animate-pulse"
            />
          ))}
        </div>
      ) : debts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2 text-hard-gray">
          <p className="font-medium">No debts in this category</p>
          <p className="text-sm">Create one with the button above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {debts.map((debt) => (
            <DebtCard
              key={debt.id}
              debt={debt}
              onUpdate={(id, data: IUpdateDebt) => updateDebt(id, data)}
              onDelete={deleteDebt}
              onPay={(id, data: ICreatePayment) => addPayment(id, data)}
            />
          ))}
        </div>
      )}

      <DebtDrawer
        isOpen={isDrawerOpen}
        mode="create"
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleCreate}
        isLoading={isCreating}
      />
    </div>
  );
}
