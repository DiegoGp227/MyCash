import { useCallback, useState } from "react";
import { transactionsService } from "../services/transactionsService";
import {
  ITransaction,
  ICreateTransaction,
  IUpdateTransaction,
  ITransactionFilters,
} from "../types/transactions.types";

export function useTransactions() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async (filters?: ITransactionFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await transactionsService.getTransactions(filters);
      setTransactions(response.transactions);
      return response.transactions;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al obtener transacciones");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTransaction = useCallback(async (data: ICreateTransaction) => {
    setIsCreating(true);
    setError(null);
    try {
      const response = await transactionsService.createTransaction(data);
      setTransactions((prev) => [response.transaction, ...prev]);
      return response.transaction;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear transacción");
      throw err;
    } finally {
      setIsCreating(false);
    }
  }, []);

  const updateTransaction = useCallback(async (id: string, data: IUpdateTransaction) => {
    setIsUpdating(true);
    setError(null);
    try {
      const response = await transactionsService.updateTransaction(id, data);
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? response.transaction : t))
      );
      return response.transaction;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar transacción");
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    setIsDeleting(true);
    setError(null);
    try {
      await transactionsService.deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar transacción");
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return {
    transactions,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
