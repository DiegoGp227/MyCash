"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { useTransactions } from "@/src/transactions/hooks/useTransactions";
import type { ITransaction } from "@/src/transactions/types/transactions.types";
import type { TransactionFormInput } from "@/src/transactions/schemas/transaction.schema";
import TransactionDrawer from "./TransactionDrawer";
import TransactionDeleteModal from "./TransactionDeleteModal";

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount);

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function TransactionsSection() {
  const {
    transactions,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<ITransaction | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const openCreate = () => {
    setSelectedTransaction(null);
    setDrawerMode("create");
    setDrawerOpen(true);
  };

  const openEdit = (t: ITransaction) => {
    setSelectedTransaction(t);
    setDrawerMode("edit");
    setDrawerOpen(true);
  };

  const openDelete = (t: ITransaction) => {
    setTransactionToDelete(t);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async (data: TransactionFormInput) => {
    if (drawerMode === "create") {
      await createTransaction({
        type: data.type,
        amount: data.amount,
        accountId: data.accountId,
        categoryId: data.categoryId || undefined,
        description: data.description || undefined,
        date: new Date(data.date).toISOString(),
      });
    } else if (selectedTransaction) {
      await updateTransaction(selectedTransaction.id, {
        type: data.type,
        amount: data.amount,
        accountId: data.accountId,
        categoryId: data.categoryId || null,
        description: data.description || null,
        date: new Date(data.date).toISOString(),
      });
    }
    setDrawerOpen(false);
  };

  const handleDelete = async () => {
    if (!transactionToDelete) return;
    await deleteTransaction(transactionToDelete.id);
    setDeleteModalOpen(false);
    setTransactionToDelete(null);
  };

  return (
    <div className="flex flex-col w-full max-w-5xl gap-5 p-4 rounded border-2 border-primary-purple bg-gray-bg dark:bg-light-purple-bg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Transacciones</h2>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded bg-primary-purple text-white font-semibold hover:bg-primary-purple-hover transition-colors cursor-pointer"
        >
          <Plus size={18} />
          Nueva
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <span className="text-hard-gray">Cargando transacciones...</span>
        </div>
      ) : transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
          <p className="text-hard-gray">No hay transacciones registradas.</p>
          <p className="text-sm text-hard-gray">
            Crea tu primera transacción con el botón de arriba.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-primary-purple/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-primary-purple/30 bg-white/50 dark:bg-dark-surface/50">
                {["Fecha", "Descripción", "Cuenta", "Categoría", "Tipo", "Monto", ""].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-hard-gray"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-gray-100 dark:border-gray-800/50 last:border-0 hover:bg-primary-purple/5 dark:hover:bg-primary-purple/10 transition-colors"
                >
                  <td className="px-4 py-3 text-hard-gray whitespace-nowrap">
                    {formatDate(t.date)}
                  </td>
                  <td className="px-4 py-3 dark:text-white max-w-[180px] truncate">
                    {t.description ?? <span className="text-hard-gray italic">Sin descripción</span>}
                  </td>
                  <td className="px-4 py-3 text-hard-gray whitespace-nowrap">
                    {t.accountName}
                  </td>
                  <td className="px-4 py-3 text-hard-gray whitespace-nowrap">
                    {t.categoryName ?? <span className="italic">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                        ${t.type === "INCOME"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                    >
                      {t.type === "INCOME"
                        ? <TrendingUp size={12} />
                        : <TrendingDown size={12} />}
                      {t.type === "INCOME" ? "Ingreso" : "Gasto"}
                    </span>
                  </td>
                  <td
                    className={`px-4 py-3 font-bold whitespace-nowrap ${
                      t.type === "INCOME" ? "text-green-600 dark:text-green-400" : "text-error"
                    }`}
                  >
                    {t.type === "INCOME" ? "+" : "-"}
                    {formatAmount(t.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEdit(t)}
                        className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors cursor-pointer"
                      >
                        <Pencil size={14} className="text-primary-purple" />
                      </button>
                      <button
                        onClick={() => openDelete(t)}
                        className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} className="text-error" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TransactionDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
        mode={drawerMode}
        transaction={selectedTransaction}
        isLoading={isCreating || isUpdating}
      />

      <TransactionDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
