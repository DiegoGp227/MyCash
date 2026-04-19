"use client";

import { useForm } from "react-hook-form";
import type { ICreatePayment } from "@/src/debts/types/debts.types";

interface PaymentFormData {
  amount: number;
  note?: string;
  paidAt?: string;
}

interface PaymentFormProps {
  maxAmount: number;
  onSubmit: (data: ICreatePayment) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(n);

export default function PaymentForm({ maxAmount, onSubmit, onCancel, isLoading }: PaymentFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>({
    defaultValues: { paidAt: new Date().toISOString().slice(0, 10) },
  });

  const handlePay = async (data: PaymentFormData) => {
    await onSubmit({
      amount: Number(data.amount),
      note: data.note || undefined,
      paidAt: data.paidAt ? new Date(data.paidAt).toISOString() : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit(handlePay)} className="flex flex-col gap-5">
      <div className="p-3 rounded bg-gray-50 dark:bg-dark-bg text-sm dark:text-white">
        Saldo pendiente: <span className="font-bold text-primary-purple">{fmt(maxAmount)}</span>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Monto del pago</label>
        <input
          type="number"
          min={1}
          max={maxAmount}
          step="any"
          placeholder="0"
          {...register("amount", {
            required: "El monto es requerido",
            min: { value: 1, message: "Debe ser mayor a 0" },
            max: { value: maxAmount, message: `No puede superar ${fmt(maxAmount)}` },
            valueAsNumber: true,
          })}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
        />
        {errors.amount && <p className="text-error text-xs">{errors.amount.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Fecha de pago</label>
        <input
          type="date"
          {...register("paidAt")}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Nota (opcional)</label>
        <input
          type="text"
          placeholder="Ej: Cuota de enero"
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
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 h-10 rounded bg-primary-purple text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isLoading ? "Registrando..." : "Registrar Pago"}
        </button>
      </div>
    </form>
  );
}
