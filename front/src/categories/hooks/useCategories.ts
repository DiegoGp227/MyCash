import { useCallback, useState } from "react";
import { categoriesService } from "../services/categoriesService";
import {
  ICategory,
  ICreateCategory,
  IUpdateCategory,
  CategoryType,
} from "../types/categories.types";

/**
 * Hook para manejar operaciones CRUD de categorías
 *
 * Ejemplo de uso:
 * ```tsx
 * const {
 *   categories,
 *   isLoading,
 *   error,
 *   fetchCategories,
 *   createCategory,
 *   updateCategory
 * } = useCategories();
 *
 * // Obtener todas las categorías
 * useEffect(() => {
 *   fetchCategories();
 * }, []);
 *
 * // Obtener solo categorías de gastos
 * fetchCategories("EXPENSE");
 *
 * // Crear una categoría
 * await createCategory({ name: "Comida", color: "#FF5733", type: "EXPENSE" });
 *
 * // Actualizar una categoría
 * await updateCategory("category-id", { name: "Alimentación" });
 * ```
 */
export function useCategories() {
  // Estado para almacenar las categorías
  const [categories, setCategories] = useState<ICategory[]>([]);

  // Estados de loading separados para cada operación
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Estado de error
  const [error, setError] = useState<string | null>(null);

  /**
   * GET - Obtener categorías
   * @param type - Filtro opcional: "INCOME" | "EXPENSE"
   */
  const fetchCategories = useCallback(async (type?: CategoryType) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await categoriesService.getCategories(type);
      setCategories(response.categories);
      return response.categories;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error fetching categories";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * POST - Crear una nueva categoría
   */
  const createCategory = useCallback(async (data: ICreateCategory) => {
    setIsCreating(true);
    setError(null);

    try {
      const response = await categoriesService.createCategory(data);

      // Agregar la nueva categoría al estado local
      setCategories((prev) => [...prev, response.category]);

      return response.category;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error creating category";
      setError(errorMessage);
      throw err;
    } finally {
      setIsCreating(false);
    }
  }, []);

  /**
   * PATCH - Actualizar una categoría existente
   */
  const updateCategory = useCallback(
    async (categoryId: string, data: IUpdateCategory) => {
      setIsUpdating(true);
      setError(null);

      try {
        const response = await categoriesService.updateCategory(categoryId, data);

        // Actualizar la categoría en el estado local
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === categoryId ? response.category : cat
          )
        );

        return response.category;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error updating category";
        setError(errorMessage);
        throw err;
      } finally {
        setIsUpdating(false);
      }
    },
    []
  );

  /**
   * DELETE - Eliminar una categoría (soft delete)
   */
  const deleteCategory = useCallback(async (categoryId: string) => {
    setIsDeleting(true);
    setError(null);

    try {
      await categoriesService.deleteCategory(categoryId);

      // Remover la categoría del estado local
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error deleting category";
      setError(errorMessage);
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  /**
   * Limpiar el error manualmente
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Estado
    categories,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,

    // Acciones
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    clearError,
  };
}
