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
        <label className="text-sm font-medium dark:text-white">Debt name</label>
        <input
          type="text"
          placeholder="E.g.: Visa Card"
          {...register("name", { required: "Name is required" })}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
        />
        {errors.name && <p className="text-error text-xs">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Creditor</label>
        <input
          type="text"
          placeholder="E.g.: Bank of America"
          {...register("creditor", { required: "Creditor is required" })}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
        />
        {errors.creditor && <p className="text-error text-xs">{errors.creditor.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Total amount</label>
        <input
          type="number"
          min={1}
          step="any"
          placeholder="0"
          {...register("totalAmount", {
            required: "Amount is required",
            min: { value: 1, message: "Must be greater than 0" },
            valueAsNumber: true,
          })}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
        />
        {errors.totalAmount && <p className="text-error text-xs">{errors.totalAmount.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium dark:text-white">Interest rate % (optional)</label>
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
          <label className="text-sm font-medium dark:text-white">Payment day (optional)</label>
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
        <label className="text-sm font-medium dark:text-white">Due date (optional)</label>
        <input
          type="date"
          {...register("dueDate")}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Notes (optional)</label>
        <textarea
          placeholder="Observations..."
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
          Cancel
        </button>
        <button
          type="submit"
          disabled={props.isLoading}
          className="flex-1 h-10 rounded bg-primary-purple text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {props.isLoading
            ? props.mode === "create" ? "Creating..." : "Saving..."
            : props.mode === "create" ? "Create" : "Save"}
        </button>
      </div>
    </form>
  );
}
