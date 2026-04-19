"use client";

import { useState } from "react";
import { Pencil, Trash2, CreditCard, AlertTriangle } from "lucide-react";
import type { IDebt, IUpdateDebt, ICreatePayment } from "@/src/debts/types/debts.types";
import DebtDrawer from "./DebtDrawer";

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(n);

const STATUS_STYLES: Record<IDebt["status"], string> = {
  ACTIVE: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
  PAID: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20",
  OVERDUE: "text-error bg-red-50 dark:bg-red-900/20",
};

const STATUS_LABELS: Record<IDebt["status"], string> = {
  ACTIVE: "Activa",
  PAID: "Pagada",
  OVERDUE: "Vencida",
};

interface DebtCardProps {
  debt: IDebt;
  onUpdate: (id: string, data: IUpdateDebt) => Promise<unknown>;
  onDelete: (id: string) => Promise<void>;
  onPay: (id: string, data: ICreatePayment) => Promise<unknown>;
}

export default function DebtCard({ debt, onUpdate, onDelete, onPay }: DebtCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const paid = debt.totalAmount - debt.remainingAmount;
  const pct = debt.totalAmount > 0 ? Math.min((paid / debt.totalAmount) * 100, 100) : 0;

  const isOverdue =
    debt.status === "ACTIVE" &&
    debt.dueDate &&
    new Date(debt.dueDate) < new Date();

  const handleDelete = async () => {
    setIsDeleting(true);
    try { await onDelete(debt.id); } finally { setIsDeleting(false); }
  };

  const handleUpdate = async (data: IUpdateDebt) => {
    setIsUpdating(true);
    try { await onUpdate(debt.id, data); setIsEditOpen(false); } finally { setIsUpdating(false); }
  };

  const handlePay = async (data: ICreatePayment) => {
    setIsPaying(true);
    try { await onPay(debt.id, data); setIsPayOpen(false); } finally { setIsPaying(false); }
  };

  return (
    <>
      <div className="p-4 rounded border-2 border-primary-purple bg-white dark:bg-light-purple-bg flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold dark:text-white truncate">{debt.name}</p>
              {isOverdue && <AlertTriangle size={14} className="text-error shrink-0" />}
            </div>
            <p className="text-xs text-hard-gray">{debt.creditor}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${STATUS_STYLES[debt.status]}`}>
              {STATUS_LABELS[debt.status]}
            </span>
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
            <span>Pagado: {fmt(paid)}</span>
            <span>Total: {fmt(debt.totalAmount)}</span>
          </div>
          <div className="w-full h-2.5 bg-gray-200 dark:bg-dark-bg rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${debt.status === "PAID" ? "bg-green-500" : "bg-primary-purple"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-0.5">
            <span className="text-hard-gray">{pct.toFixed(0)}% pagado</span>
            {debt.remainingAmount > 0 && (
              <span className="font-medium text-error">Restante: {fmt(debt.remainingAmount)}</span>
            )}
          </div>
        </div>

        {/* Extra info */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-hard-gray">
          {debt.interestRate !== null && (
            <span>Interés: {debt.interestRate}% EA</span>
          )}
          {debt.paymentDay && (
            <span>Pago: día {debt.paymentDay}</span>
          )}
          {debt.dueDate && (
            <span className={isOverdue ? "text-error" : ""}>
              Vence: {new Date(debt.dueDate).toLocaleDateString("es-CO")}
            </span>
          )}
        </div>

        {debt.notes && (
          <p className="text-xs text-hard-gray italic">{debt.notes}</p>
        )}

        {/* Pay button */}
        {debt.status !== "PAID" && debt.remainingAmount > 0 && (
          <button
            onClick={() => setIsPayOpen(true)}
            className="flex items-center justify-center gap-1.5 h-8 w-full rounded border border-primary-purple text-primary-purple text-xs font-medium hover:bg-primary-purple/5 transition-colors"
          >
            <CreditCard size={13} /> Registrar Pago
          </button>
        )}
      </div>

      <DebtDrawer
        isOpen={isEditOpen}
        mode="edit"
        debt={debt}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleUpdate}
        isLoading={isUpdating}
      />

      <DebtDrawer
        isOpen={isPayOpen}
        mode="pay"
        debtName={debt.name}
        remainingAmount={debt.remainingAmount}
        onClose={() => setIsPayOpen(false)}
        onSubmit={handlePay}
        isLoading={isPaying}
      />
    </>
  );
}
