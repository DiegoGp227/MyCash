import { useCallback, useState } from "react";
import { accountsService } from "../services/accountsService";
import { IAccount, ICreateAccount, IUpdateAccount } from "../types/accounts.types";

export function useAccounts() {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await accountsService.getAccounts();
      setAccounts(response.accounts);
      return response.accounts;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al obtener cuentas");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createAccount = useCallback(async (data: ICreateAccount) => {
    setIsCreating(true);
    setError(null);
    try {
      const response = await accountsService.createAccount(data);
      setAccounts((prev) => [...prev, response.account]);
      return response.account;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear cuenta");
      throw err;
    } finally {
      setIsCreating(false);
    }
  }, []);

  const updateAccount = useCallback(async (accountId: string, data: IUpdateAccount) => {
    setIsUpdating(true);
    setError(null);
    try {
      const response = await accountsService.updateAccount(accountId, data);
      setAccounts((prev) =>
        prev.map((acc) => (acc.id === accountId ? response.account : acc))
      );
      return response.account;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar cuenta");
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const deleteAccount = useCallback(async (accountId: string) => {
    setIsDeleting(true);
    setError(null);
    try {
      await accountsService.deleteAccount(accountId);
      setAccounts((prev) => prev.filter((acc) => acc.id !== accountId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar cuenta");
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return {
    accounts,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    fetchAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
  };
}
