"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categorySchema,
  CategoryFormInput,
} from "@/src/categories/schemas/category.schema";
import ColorPicker from "../Atoms/ColorPicker";
import IconPicker from "../Atoms/IconPicker";
import type { CategoryType } from "@/src/categories/types/categories.types";

interface CategoryFormProps {
  onSubmit: (data: CategoryFormInput) => void;
  onCancel: () => void;
  defaultValues?: Partial<CategoryFormInput>;
  isLoading?: boolean;
  submitLabel: string;
  type: CategoryType;
}

export default function CategoryForm({
  onSubmit,
  onCancel,
  defaultValues,
  isLoading,
  submitLabel,
  type,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CategoryFormInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultValues?.name || "",
      color: defaultValues?.color || "",
      icon: defaultValues?.icon || "",
      type,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Nombre */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-hard-gray font-semibold">
          Nombre *
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="input text-hard-gray"
          disabled={isLoading}
          placeholder="Ej: Alimentacion"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Color */}
      <div className="flex flex-col gap-1">
        <label className="text-hard-gray font-semibold">Color *</label>
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorPicker
              value={field.value}
              onChange={field.onChange}
              error={errors.color?.message}
            />
          )}
        />
      </div>

      {/* Icono */}
      <div className="flex flex-col gap-1">
        <label className="text-hard-gray font-semibold">Icono</label>
        <Controller
          name="icon"
          control={control}
          render={({ field }) => (
            <IconPicker
              value={field.value}
              onChange={field.onChange}
              error={errors.icon?.message}
            />
          )}
        />
      </div>

      {/* Tipo (hidden) */}
      <input type="hidden" {...register("type")} />

      {/* Botones */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 py-2 rounded border-2 border-primary-purple text-black dark:text-white cursor-pointer font-semibold hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-2 rounded bg-primary-purple text-white cursor-pointer font-semibold hover:bg-primary-purple-hover transition-colors"
        >
          {isLoading ? "Guardando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
