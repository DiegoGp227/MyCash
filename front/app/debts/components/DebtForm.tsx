"use client";

import { useForm } from "react-hook-form";
import type { ICreateDebt, IUpdateDebt, IDebt } from "@/src/debts/types/debts.types";

interface DebtFormData {
  name: string;
  creditor: string;
  totalAmount: number;
  interestRate?: number;
  dueDate?: string;
  paymentDay?: number;
  notes?: string;
}

interface DebtFormCreateProps {
  mode: "create";
  onSubmit: (data: ICreateDebt) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

interface DebtFormEditProps {
  mode: "edit";
  debt: IDebt;
  onSubmit: (data: IUpdateDebt) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

type DebtFormProps = DebtFormCreateProps | DebtFormEditProps;

export default function DebtForm(props: DebtFormProps) {
  const defaultValues =
    props.mode === "edit"
      ? {
          name: props.debt.name,
          creditor: props.debt.creditor,
          totalAmount: props.debt.totalAmount,
          interestRate: props.debt.interestRate ?? undefined,
          dueDate: props.debt.dueDate
            ? new Date(props.debt.dueDate).toISOString().slice(0, 10)
            : "",
          paymentDay: props.debt.paymentDay ?? undefined,
          notes: props.debt.notes ?? "",
        }
      : {};

  const { register, handleSubmit, formState: { errors } } = useForm<DebtFormData>({ defaultValues });

  const onSubmit = async (data: DebtFormData) => {
    const payload = {
      name: data.name,
      creditor: data.creditor,
      totalAmount: Number(data.totalAmount),
      interestRate: data.interestRate ? Number(data.interestRate) : undefined,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
      paymentDay: data.paymentDay ? Number(data.paymentDay) : undefined,
      notes: data.notes || undefined,
    };
    await props.onSubmit(payload as ICreateDebt & IUpdateDebt);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Nombre de la deuda</label>
        <input
          type="text"
          placeholder="Ej: Tarjeta Visa"
          {...register("name", { required: "El nombre es requerido" })}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
        />
        {errors.name && <p className="text-error text-xs">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Acreedor</label>
        <input
          type="text"
          placeholder="Ej: Banco de Bogotá"
          {...register("creditor", { required: "El acreedor es requerido" })}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
        />
        {errors.creditor && <p className="text-error text-xs">{errors.creditor.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Monto total</label>
        <input
          type="number"
          min={1}
          step="any"
          placeholder="0"
          {...register("totalAmount", {
            required: "El monto es requerido",
            min: { value: 1, message: "Debe ser mayor a 0" },
            valueAsNumber: true,
          })}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
        />
        {errors.totalAmount && <p className="text-error text-xs">{errors.totalAmount.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium dark:text-white">Tasa de interés % (opcional)</label>
          <input
            type="number"
            min={0}
            max={100}
            step="0.01"
            placeholder="0.00"
            {...register("interestRate", { valueAsNumber: true })}
            className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium dark:text-white">Día de pago (opcional)</label>
          <input
            type="number"
            min={1}
            max={31}
            placeholder="1-31"
            {...register("paymentDay", { valueAsNumber: true })}
            className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Fecha de vencimiento (opcional)</label>
        <input
          type="date"
          {...register("dueDate")}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Notas (opcional)</label>
        <textarea
          placeholder="Observaciones..."
          rows={2}
          {...register("notes")}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple resize-none"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={props.onCancel}
          className="flex-1 h-10 rounded border border-gray-300 dark:border-dark-border text-sm dark:text-white hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={props.isLoading}
          className="flex-1 h-10 rounded bg-primary-purple text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {props.isLoading
            ? props.mode === "create" ? "Creando..." : "Guardando..."
            : props.mode === "create" ? "Crear" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
