"use client";

import { useForm } from "react-hook-form";
import type { ICreateGoal, IUpdateGoal, IGoal } from "@/src/goals/types/goals.types";

interface CreateFormData {
  name: string;
  targetAmount: number;
  endDate?: string;
  icon?: string;
}

interface GoalFormCreateProps {
  mode: "create";
  onSubmit: (data: ICreateGoal) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

interface GoalFormEditProps {
  mode: "edit";
  goal: IGoal;
  onSubmit: (data: IUpdateGoal) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

type GoalFormProps = GoalFormCreateProps | GoalFormEditProps;

const GOAL_ICONS = ["🎯", "🏠", "🚗", "✈️", "💻", "📚", "💍", "🏋️", "🌴", "💰"];

export default function GoalForm(props: GoalFormProps) {
  const defaultValues =
    props.mode === "edit"
      ? {
          name: props.goal.name,
          targetAmount: props.goal.targetAmount,
          endDate: props.goal.endDate
            ? new Date(props.goal.endDate).toISOString().slice(0, 10)
            : "",
          icon: props.goal.icon ?? "",
        }
      : { name: "", targetAmount: undefined, endDate: "", icon: "" };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateFormData>({ defaultValues });

  const selectedIcon = watch("icon");

  const onSubmit = async (data: CreateFormData) => {
    const payload = {
      name: data.name,
      targetAmount: Number(data.targetAmount),
      endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
      icon: data.icon || undefined,
    };
    await props.onSubmit(payload as ICreateGoal & IUpdateGoal);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Icon picker */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium dark:text-white">Icono (opcional)</label>
        <div className="flex flex-wrap gap-2">
          {GOAL_ICONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setValue("icon", selectedIcon === emoji ? "" : emoji)}
              className={`w-10 h-10 text-xl rounded border-2 transition-colors ${
                selectedIcon === emoji
                  ? "border-primary-purple bg-primary-purple/10"
                  : "border-gray-300 dark:border-dark-border hover:border-primary-purple"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Nombre de la meta</label>
        <input
          type="text"
          placeholder="Ej: Fondo de emergencia"
          {...register("name", { required: "El nombre es requerido" })}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
        />
        {errors.name && <p className="text-error text-xs">{errors.name.message}</p>}
      </div>

      {/* Target amount */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Monto objetivo</label>
        <input
          type="number"
          min={1}
          step="any"
          placeholder="0"
          {...register("targetAmount", {
            required: "El monto es requerido",
            min: { value: 1, message: "Debe ser mayor a 0" },
            valueAsNumber: true,
          })}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
        />
        {errors.targetAmount && (
          <p className="text-error text-xs">{errors.targetAmount.message}</p>
        )}
      </div>

      {/* End date */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium dark:text-white">Fecha límite (opcional)</label>
        <input
          type="date"
          {...register("endDate")}
          className="w-full h-10 px-3 rounded border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-bg dark:text-white text-sm focus:outline-none focus:border-primary-purple"
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
            ? props.mode === "create"
              ? "Creando..."
              : "Guardando..."
            : props.mode === "create"
              ? "Crear"
              : "Guardar"}
        </button>
      </div>
    </form>
  );
}
