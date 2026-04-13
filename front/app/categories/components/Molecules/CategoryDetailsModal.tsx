"use client";

import { X } from "lucide-react";
import Portal from "../Atoms/Portal";
import Backdrop from "../Atoms/Backdrop";
import type { ICategory } from "@/src/categories/types/categories.types";

interface CategoryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: ICategory | null;
}

export default function CategoryDetailsModal({
  isOpen,
  onClose,
  category,
}: CategoryDetailsModalProps) {
  if (!isOpen || !category) return null;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <Portal>
      <Backdrop onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div
          className="bg-white dark:bg-dark-surface rounded-lg shadow-xl p-6 max-w-md w-full mx-4 pointer-events-auto"
          style={{ animation: "modalSlideIn 0.3s ease-out" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded flex items-center justify-center text-2xl"
                style={{ backgroundColor: category.color }}
              >
                {category.icon || "\u{1F4C1}"}
              </div>
              <div>
                <h3 className="text-lg font-bold dark:text-white">
                  {category.name}
                </h3>
                <span className="text-sm text-hard-gray">
                  {category.type === "INCOME" ? "Ingreso" : "Egreso"}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-bg cursor-pointer transition-colors"
            >
              <X className="dark:text-white" size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-3 border-t border-gray-300 dark:border-dark-border pt-4">
            <DetailRow label="Subcategorias" value={String(category.subcategoriesCount)} />
            <DetailRow label="Color" value={category.color}>
              <div
                className="w-4 h-4 rounded-full inline-block ml-2"
                style={{ backgroundColor: category.color }}
              />
            </DetailRow>
            <DetailRow
              label="Estado"
              value={category.isActive ? "Activa" : "Inactiva"}
            />
            <DetailRow label="Creada" value={formatDate(category.createdAt)} />
            <DetailRow
              label="Ultima modificacion"
              value={formatDate(category.updatedAt)}
            />
          </div>
        </div>
      </div>
    </Portal>
  );
}

function DetailRow({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-hard-gray">{label}</span>
      <span className="text-sm font-semibold dark:text-white flex items-center">
        {value}
        {children}
      </span>
    </div>
  );
}
