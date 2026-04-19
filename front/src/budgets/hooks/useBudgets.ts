import { useCallback, useState } from "react";
import { budgetsService } from "../services/budgetsService";
import { IBudget, ICreateBudget, IUpdateBudget } from "../types/budgets.types";

export function useBudgets() {
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBudgets = useCallback(async (month: number, year: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await budgetsService.getBudgets(month, year);
      setBudgets(response.budgets);
      return response.budgets;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error fetching budgets";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBudget = useCallback(async (data: ICreateBudget) => {
    setIsCreating(true);
    setError(null);
    try {
      const response = await budgetsService.createBudget(data);
      setBudgets((prev) => [...prev, response.budget]);
      return response.budget;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error creating budget";
      setError(msg);
      throw err;
    } finally {
      setIsCreating(false);
    }
  }, []);

  const updateBudget = useCallback(async (budgetId: string, data: IUpdateBudget) => {
    setIsUpdating(true);
    setError(null);
    try {
      const response = await budgetsService.updateBudget(budgetId, data);
      setBudgets((prev) =>
        prev.map((b) => (b.id === budgetId ? response.budget : b)),
      );
      return response.budget;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error updating budget";
      setError(msg);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const deleteBudget = useCallback(async (budgetId: string) => {
    setIsDeleting(true);
    setError(null);
    try {
      await budgetsService.deleteBudget(budgetId);
      setBudgets((prev) => prev.filter((b) => b.id !== budgetId));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error deleting budget";
      setError(msg);
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    budgets,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    fetchBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
    clearError,
  };
}
