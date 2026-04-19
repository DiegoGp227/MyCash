"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCategories } from "@/src/categories/hooks/useCategories";
import type { ICreateBudget, IUpdateBudget } from "@/src/budgets/types/budgets.types";

interface CreateFormData {
  categoryId: string;
  amount: number;
}

interface EditFormData {
  amount: number;
}

interface BudgetFormCreateProps {
  mode: "create";
  month: number;
  year: number;
  onSubmit: (data: ICreateBudget) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

interface BudgetFormEditProps {
  mode: "edit";
  defaultAmount: number;
  onSubmit: (data: IUpdateBudget) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

type BudgetFormProps = BudgetFormCreateProps | BudgetFormEditProps;

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export default function BudgetForm(props: BudgetFormProps) {
  const { categories, fetchCategories, isLoading: loadingCats } = useCategories();

  useEffect(() => {
    if (props.mode === "create") {
      fetchCategories("EXPENSE");
    }
  }, [props.mode, fetchCategories]);

  if (props.mode === "create") {
    return <CreateForm {...props} categories={categories} loadingCats={loadingCats} />;
  }

  return <EditForm {...props} />;
}

function CreateForm({
  month,
  year,
  onSubmit,
  onCancel,
  isLoading,
  categories,
  loadingCats,
}: BudgetFormCreateProps & { categories: ReturnType<typeof useCategories>["categories"]; loadingCats: boolean }) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>();

  const handleCreate = async (data: CreateFormData) => {
    await onSubmit({
      categoryId: data.categoryId,
      amount: Number(data.amount),
      month,
      year,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleCreate)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Periodo</label>
        <p className="text-hard-gray text-sm">
          {MONTHS[month - 1]} {year}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Categoría</label>
        {loadingCats ? (
          <div className="h-10 bg-gray-200 dark:bg-dark-bg rounded animate-pulse" />
        ) : (
          <select
            {...register("categoryId", { required: "Selecciona una categoría" })}
            className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
          >
            <option value="">Seleccionar categoría...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        )}
        {errors.categoryId && (
          <p className="text-error text-xs">{errors.categoryId.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Límite de gasto</label>
        <input
          type="number"
          min={1}
          step="any"
          placeholder="0"
          {...register("amount", {
            required: "El monto es requerido",
            min: { value: 1, message: "Debe ser mayor a 0" },
            valueAsNumber: true,
          })}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
        />
        {errors.amount && (
          <p className="text-error text-xs">{errors.amount.message}</p>
        )}
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
          {isLoading ? "Creando..." : "Crear"}
        </button>
      </div>
    </form>
  );
}

function EditForm({ defaultAmount, onSubmit, onCancel, isLoading }: BudgetFormEditProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<EditFormData>({
    defaultValues: { amount: defaultAmount },
  });

  const handleEdit = async (data: EditFormData) => {
    await onSubmit({ amount: Number(data.amount) });
  };

  return (
    <form onSubmit={handleSubmit(handleEdit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Nuevo límite de gasto</label>
        <input
          type="number"
          min={1}
          step="any"
          {...register("amount", {
            required: "El monto es requerido",
            min: { value: 1, message: "Debe ser mayor a 0" },
            valueAsNumber: true,
          })}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
        />
        {errors.amount && (
          <p className="text-error text-xs">{errors.amount.message}</p>
        )}
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
          {isLoading ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}
