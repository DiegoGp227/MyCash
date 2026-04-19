import { useCallback, useState } from "react";
import { debtsService } from "../services/debtsService";
import { IDebt, ICreateDebt, IUpdateDebt, ICreatePayment, DebtStatus } from "../types/debts.types";

export function useDebts() {
  const [debts, setDebts] = useState<IDebt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDebts = useCallback(async (status?: DebtStatus) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await debtsService.getDebts(status);
      setDebts(response.debts);
      return response.debts;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching debts");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createDebt = useCallback(async (data: ICreateDebt) => {
    setIsCreating(true);
    setError(null);
    try {
      const response = await debtsService.createDebt(data);
      setDebts((prev) => [response.debt, ...prev]);
      return response.debt;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error creating debt");
      throw err;
    } finally {
      setIsCreating(false);
    }
  }, []);

  const updateDebt = useCallback(async (debtId: string, data: IUpdateDebt) => {
    setIsUpdating(true);
    setError(null);
    try {
      const response = await debtsService.updateDebt(debtId, data);
      setDebts((prev) => prev.map((d) => (d.id === debtId ? response.debt : d)));
      return response.debt;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error updating debt");
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const deleteDebt = useCallback(async (debtId: string) => {
    setIsDeleting(true);
    setError(null);
    try {
      await debtsService.deleteDebt(debtId);
      setDebts((prev) => prev.filter((d) => d.id !== debtId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error deleting debt");
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const addPayment = useCallback(async (debtId: string, data: ICreatePayment) => {
    setError(null);
    try {
      const response = await debtsService.addPayment(debtId, data);
      setDebts((prev) => prev.map((d) => (d.id === debtId ? response.debt : d)));
      return response.debt;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error adding payment");
      throw err;
    }
  }, []);

  const deletePayment = useCallback(async (debtId: string, paymentId: string) => {
    setError(null);
    try {
      const response = await debtsService.deletePayment(debtId, paymentId);
      setDebts((prev) => prev.map((d) => (d.id === debtId ? response.debt : d)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error deleting payment");
      throw err;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    debts,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    fetchDebts,
    createDebt,
    updateDebt,
    deleteDebt,
    addPayment,
    deletePayment,
    clearError,
  };
}
