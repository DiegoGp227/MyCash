"use client";

import { AlertTriangle } from "lucide-react";
import Portal from "@/app/categories/components/Atoms/Portal";
import Backdrop from "@/app/categories/components/Atoms/Backdrop";

interface TransactionDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export default function TransactionDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}: TransactionDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <Backdrop onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div
          className="bg-white dark:bg-dark-surface rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 pointer-events-auto"
          style={{ animation: "modalSlideIn 0.3s ease-out" }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <AlertTriangle className="text-error" size={24} />
            </div>
            <h3 className="text-lg font-bold dark:text-white text-center">
              Eliminar transacción?
            </h3>
            <p className="text-sm text-hard-gray text-center">
              Esta acción no se puede deshacer. El balance de la cuenta también será revertido.
            </p>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 py-2 rounded border-2 border-primary-purple text-black dark:text-white cursor-pointer font-semibold hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 py-2 rounded bg-error text-white cursor-pointer font-semibold hover:bg-red-700 transition-colors"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
