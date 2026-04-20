"use client";

import { X } from "lucide-react";
import Portal from "@/app/categories/components/Atoms/Portal";
import Backdrop from "@/app/categories/components/Atoms/Backdrop";
import TransferForm from "./TransferForm";
import type { TransferFormInput } from "@/src/transfers/schemas/transfer.schema";
import type { ITransfer } from "@/src/transfers/types/transfers.types";

interface TransferDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TransferFormInput) => void;
  mode: "create" | "edit";
  transfer?: ITransfer | null;
  isLoading?: boolean;
}

export default function TransferDrawer({
  isOpen,
  onClose,
  onSubmit,
  mode,
  transfer,
  isLoading,
}: TransferDrawerProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <Backdrop onClick={onClose} />
      <div
        className="fixed top-0 right-0 h-full w-full md:max-w-md bg-white dark:bg-dark-surface z-50 shadow-xl flex flex-col"
        style={{ animation: "slideInFromRight 0.3s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-dark-border sticky top-0 bg-white dark:bg-dark-surface">
          <h2 className="text-xl font-bold text-light-text-main dark:text-dark-text-main">
            {mode === "create" ? "Nueva Transferencia" : "Editar Transferencia"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-bg cursor-pointer transition-colors"
          >
            <X className="text-light-text-main dark:text-dark-text-main" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          <TransferForm
            onSubmit={onSubmit}
            onCancel={onClose}
            transfer={transfer}
            isLoading={isLoading}
            submitLabel={mode === "create" ? "Crear transferencia" : "Guardar"}
          />
        </div>
      </div>
    </Portal>
  );
}
