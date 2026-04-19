import { useState, useCallback } from "react";
import { transfersService } from "../services/transfersService";
import type { ITransfer, ICreateTransfer, IUpdateTransfer } from "../types/transfers.types";

export function useTransfers() {
  const [transfers, setTransfers] = useState<ITransfer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTransfers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await transfersService.getTransfers();
      setTransfers(data.transfers);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTransfer = useCallback(async (data: ICreateTransfer) => {
    setIsCreating(true);
    try {
      const res = await transfersService.createTransfer(data);
      setTransfers((prev) => [res.transfer, ...prev]);
    } finally {
      setIsCreating(false);
    }
  }, []);

  const updateTransfer = useCallback(async (id: string, data: IUpdateTransfer) => {
    setIsUpdating(true);
    try {
      const res = await transfersService.updateTransfer(id, data);
      setTransfers((prev) => prev.map((t) => (t.id === id ? res.transfer : t)));
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const deleteTransfer = useCallback(async (id: string) => {
    setIsDeleting(true);
    try {
      await transfersService.deleteTransfer(id);
      setTransfers((prev) => prev.filter((t) => t.id !== id));
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return {
    transfers,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    fetchTransfers,
    createTransfer,
    updateTransfer,
    deleteTransfer,
  };
}
