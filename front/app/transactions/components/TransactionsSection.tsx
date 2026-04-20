"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, TrendingUp, TrendingDown, ArrowLeftRight, Search, X } from "lucide-react";
import { useTransactions } from "@/src/transactions/hooks/useTransactions";
import { useTransfers } from "@/src/transfers/hooks/useTransfers";
import type { ITransaction } from "@/src/transactions/types/transactions.types";
import type { ITransfer } from "@/src/transfers/types/transfers.types";
import type { TransactionFormInput } from "@/src/transactions/schemas/transaction.schema";
import type { TransferFormInput } from "@/src/transfers/schemas/transfer.schema";
import TransactionDrawer from "./TransactionDrawer";
import TransactionDeleteModal from "./TransactionDeleteModal";
import TransferDrawer from "./TransferDrawer";

type Tab = "transactions" | "transfers";
type TypeFilter = "all" | "INCOME" | "EXPENSE";

const monthLabel = (ym: string) => {
  const [year, month] = ym.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

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
  const [tab, setTab] = useState<Tab>("transactions");

  // Transactions state
  const {
    transactions,
    isLoading: txLoading,
    isCreating: txCreating,
    isUpdating: txUpdating,
    isDeleting: txDeleting,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const [txDrawerOpen, setTxDrawerOpen] = useState(false);
  const [txDrawerMode, setTxDrawerMode] = useState<"create" | "edit">("create");
  const [selectedTx, setSelectedTx] = useState<ITransaction | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [txToDelete, setTxToDelete] = useState<ITransaction | null>(null);

  // Transfers state
  const {
    transfers,
    isLoading: trLoading,
    isCreating: trCreating,
    isUpdating: trUpdating,
    isDeleting: trDeleting,
    fetchTransfers,
    createTransfer,
    updateTransfer,
    deleteTransfer,
  } = useTransfers();

  const [trDrawerOpen, setTrDrawerOpen] = useState(false);
  const [trDrawerMode, setTrDrawerMode] = useState<"create" | "edit">("create");
  const [selectedTr, setSelectedTr] = useState<ITransfer | null>(null);
  const [trDeleteOpen, setTrDeleteOpen] = useState(false);
  const [trToDelete, setTrToDelete] = useState<ITransfer | null>(null);

  useEffect(() => { fetchTransactions(); }, [fetchTransactions]);
  useEffect(() => { fetchTransfers(); }, [fetchTransfers]);

  // ── Filtros de transacciones ──────────────────────────────────────────────
  const [txSearch, setTxSearch] = useState("");
  const [txType, setTxType] = useState<TypeFilter>("all");
  const [txMonth, setTxMonth] = useState("all");

  const txMonthOptions = useMemo(() => {
    const set = new Set(transactions.map((t) => t.date.slice(0, 7)));
    return Array.from(set).sort().reverse();
  }, [transactions]);

  const filteredTx = useMemo(() => {
    const q = txSearch.toLowerCase();
    return transactions.filter((t) => {
      const matchesSearch =
        !q ||
        t.description?.toLowerCase().includes(q) ||
        t.accountName.toLowerCase().includes(q) ||
        (t.categoryName?.toLowerCase().includes(q) ?? false);
      const matchesType = txType === "all" || t.type === txType;
      const matchesMonth = txMonth === "all" || t.date.startsWith(txMonth);
      return matchesSearch && matchesType && matchesMonth;
    });
  }, [transactions, txSearch, txType, txMonth]);

  const txFiltersActive = txSearch !== "" || txType !== "all" || txMonth !== "all";
  const clearTxFilters = () => { setTxSearch(""); setTxType("all"); setTxMonth("all"); };

  // ── Filtros de transferencias ─────────────────────────────────────────────
  const [trSearch, setTrSearch] = useState("");
  const [trMonth, setTrMonth] = useState("all");

  const trMonthOptions = useMemo(() => {
    const set = new Set(transfers.map((t) => t.date.slice(0, 7)));
    return Array.from(set).sort().reverse();
  }, [transfers]);

  const filteredTr = useMemo(() => {
    const q = trSearch.toLowerCase();
    return transfers.filter((t) => {
      const matchesSearch =
        !q ||
        t.description?.toLowerCase().includes(q) ||
        t.fromAccountName.toLowerCase().includes(q) ||
        t.toAccountName.toLowerCase().includes(q);
      const matchesMonth = trMonth === "all" || t.date.startsWith(trMonth);
      return matchesSearch && matchesMonth;
    });
  }, [transfers, trSearch, trMonth]);

  const trFiltersActive = trSearch !== "" || trMonth !== "all";
  const clearTrFilters = () => { setTrSearch(""); setTrMonth("all"); };

  // Transaction handlers
  const handleTxSubmit = async (data: TransactionFormInput) => {
    if (txDrawerMode === "create") {
      await createTransaction({
        type: data.type,
        amount: data.amount,
        accountId: data.accountId,
        categoryId: data.categoryId || undefined,
        description: data.description || undefined,
        date: new Date(data.date).toISOString(),
      });
    } else if (selectedTx) {
      await updateTransaction(selectedTx.id, {
        type: data.type,
        amount: data.amount,
        accountId: data.accountId,
        categoryId: data.categoryId || null,
        description: data.description || null,
        date: new Date(data.date).toISOString(),
      });
    }
    setTxDrawerOpen(false);
  };

  const handleTxDelete = async () => {
    if (!txToDelete) return;
    await deleteTransaction(txToDelete.id);
    setDeleteModalOpen(false);
    setTxToDelete(null);
  };

  // Transfer handlers
  const handleTrSubmit = async (data: TransferFormInput) => {
    if (trDrawerMode === "create") {
      await createTransfer({
        fromAccountId: data.fromAccountId,
        toAccountId: data.toAccountId,
        amount: data.amount,
        description: data.description || undefined,
        date: new Date(data.date).toISOString(),
      });
    } else if (selectedTr) {
      await updateTransfer(selectedTr.id, {
        fromAccountId: data.fromAccountId,
        toAccountId: data.toAccountId,
        amount: data.amount,
        description: data.description || null,
        date: new Date(data.date).toISOString(),
      });
    }
    setTrDrawerOpen(false);
  };

  const handleTrDelete = async () => {
    if (!trToDelete) return;
    await deleteTransfer(trToDelete.id);
    setTrDeleteOpen(false);
    setTrToDelete(null);
  };

  return (
    <div className="flex flex-col w-full gap-5 p-4 rounded border-2 border-primary-purple bg-gray-bg dark:bg-light-purple-bg">

      {/* Header con tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Tabs */}
        <div className="flex rounded-lg overflow-hidden border-2 border-primary-purple">
          <button
            onClick={() => setTab("transactions")}
            className={`px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
              tab === "transactions"
                ? "bg-primary-purple text-white"
                : "bg-transparent text-hard-gray hover:bg-primary-purple/10"
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setTab("transfers")}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
              tab === "transfers"
                ? "bg-primary-purple text-white"
                : "bg-transparent text-hard-gray hover:bg-primary-purple/10"
            }`}
          >
            <ArrowLeftRight size={14} />
            Transfers
          </button>
        </div>

        {/* Botón nueva */}
        <button
          onClick={() => {
            if (tab === "transactions") {
              setSelectedTx(null);
              setTxDrawerMode("create");
              setTxDrawerOpen(true);
            } else {
              setSelectedTr(null);
              setTrDrawerMode("create");
              setTrDrawerOpen(true);
            }
          }}
          className="flex items-center gap-2 px-4 py-2 rounded bg-primary-purple text-white font-semibold hover:bg-primary-purple-hover transition-colors cursor-pointer"
        >
          <Plus size={18} />
          {tab === "transactions" ? "New" : "New transfer"}
        </button>
      </div>

      {/* ─── TAB: TRANSACCIONES ─── */}
      {tab === "transactions" && (
        txLoading ? (
          <div className="flex justify-center py-10">
            <span className="text-hard-gray">Loading transactions...</span>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
            <p className="text-hard-gray">No transactions yet.</p>
            <p className="text-sm text-hard-gray">Create your first transaction with the button above.</p>
          </div>
        ) : (
          <>
            {/* Filtros */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Search */}
              <div className="relative w-full sm:flex-1 sm:min-w-[180px]">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-hard-gray pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={txSearch}
                  onChange={(e) => setTxSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-primary-purple/30 bg-white dark:bg-dark-surface dark:text-white placeholder:text-hard-gray focus:outline-none focus:border-primary-purple transition-colors"
                />
              </div>

              {/* Type pills */}
              <div className="flex rounded-lg overflow-hidden border border-primary-purple/30">
                {(["all", "INCOME", "EXPENSE"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setTxType(v)}
                    className={`px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                      txType === v
                        ? "bg-primary-purple text-white"
                        : "bg-white dark:bg-dark-surface text-hard-gray hover:bg-primary-purple/10"
                    }`}
                  >
                    {v === "all" ? "All" : v === "INCOME" ? "Income" : "Expense"}
                  </button>
                ))}
              </div>

              {/* Month */}
              <select
                value={txMonth}
                onChange={(e) => setTxMonth(e.target.value)}
                className="px-3 py-2 text-sm rounded-lg border border-primary-purple/30 bg-white dark:bg-dark-surface dark:text-white text-hard-gray focus:outline-none focus:border-primary-purple transition-colors cursor-pointer"
              >
                <option value="all">All months</option>
                {txMonthOptions.map((m) => (
                  <option key={m} value={m}>{monthLabel(m)}</option>
                ))}
              </select>

              {/* Clear */}
              {txFiltersActive && (
                <button
                  onClick={clearTxFilters}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-hard-gray hover:text-error transition-colors cursor-pointer"
                >
                  <X size={13} /> Clear
                </button>
              )}

              {/* Result count */}
              {txFiltersActive && (
                <span className="ml-auto text-xs text-hard-gray">
                  {filteredTx.length} result{filteredTx.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {filteredTx.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
                <Search size={32} className="text-primary-purple/30" />
                <p className="text-hard-gray text-sm">No transactions match your filters.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-primary-purple/30">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-primary-purple/30 bg-white/50 dark:bg-dark-surface/50">
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-hard-gray">Date</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-hard-gray">Description</th>
                      <th className="hidden sm:table-cell px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-hard-gray">Account</th>
                      <th className="hidden md:table-cell px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-hard-gray">Category</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-hard-gray">Type</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-hard-gray">Amount</th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTx.map((t) => (
                      <tr key={t.id} className="border-b border-gray-100 dark:border-gray-800/50 last:border-0 hover:bg-primary-purple/5 dark:hover:bg-primary-purple/10 transition-colors">
                        <td className="px-3 py-3 text-hard-gray whitespace-nowrap">{formatDate(t.date)}</td>
                        <td className="px-3 py-3 dark:text-white max-w-[140px] truncate">
                          {t.description ?? <span className="text-hard-gray italic">No description</span>}
                        </td>
                        <td className="hidden sm:table-cell px-3 py-3 text-hard-gray whitespace-nowrap">{t.accountName}</td>
                        <td className="hidden md:table-cell px-3 py-3 text-hard-gray whitespace-nowrap">
                          {t.categoryName ?? <span className="italic">—</span>}
                        </td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                            ${t.type === "INCOME"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}>
                            {t.type === "INCOME" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            <span className="hidden sm:inline">{t.type === "INCOME" ? "Income" : "Expense"}</span>
                          </span>
                        </td>
                        <td className={`px-3 py-3 font-bold whitespace-nowrap ${t.type === "INCOME" ? "text-green-600 dark:text-green-400" : "text-error"}`}>
                          {t.type === "INCOME" ? "+" : "-"}{formatAmount(t.amount)}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex gap-1">
                            <button onClick={() => { setSelectedTx(t); setTxDrawerMode("edit"); setTxDrawerOpen(true); }}
                              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors cursor-pointer">
                              <Pencil size={14} className="text-primary-purple" />
                            </button>
                            <button onClick={() => { setTxToDelete(t); setDeleteModalOpen(true); }}
                              className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer">
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
          </>
        )
      )}

      {/* ─── TAB: TRANSFERENCIAS ─── */}
      {tab === "transfers" && (
        trLoading ? (
          <div className="flex justify-center py-10">
            <span className="text-hard-gray">Loading transfers...</span>
          </div>
        ) : transfers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
            <ArrowLeftRight size={40} className="text-primary-purple/40" />
            <p className="text-hard-gray">No transfers yet.</p>
            <p className="text-sm text-hard-gray">Move money between your accounts with the button above.</p>
          </div>
        ) : (
          <>
            {/* Filtros */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative w-full sm:flex-1 sm:min-w-[180px]">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-hard-gray pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={trSearch}
                  onChange={(e) => setTrSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-primary-purple/30 bg-white dark:bg-dark-surface dark:text-white placeholder:text-hard-gray focus:outline-none focus:border-primary-purple transition-colors"
                />
              </div>

              <select
                value={trMonth}
                onChange={(e) => setTrMonth(e.target.value)}
                className="px-3 py-2 text-sm rounded-lg border border-primary-purple/30 bg-white dark:bg-dark-surface dark:text-white text-hard-gray focus:outline-none focus:border-primary-purple transition-colors cursor-pointer"
              >
                <option value="all">All months</option>
                {trMonthOptions.map((m) => (
                  <option key={m} value={m}>{monthLabel(m)}</option>
                ))}
              </select>

              {trFiltersActive && (
                <button
                  onClick={clearTrFilters}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-hard-gray hover:text-error transition-colors cursor-pointer"
                >
                  <X size={13} /> Clear
                </button>
              )}

              {trFiltersActive && (
                <span className="ml-auto text-xs text-hard-gray">
                  {filteredTr.length} result{filteredTr.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {filteredTr.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
                <Search size={32} className="text-primary-purple/30" />
                <p className="text-hard-gray text-sm">No transfers match your filters.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-primary-purple/30">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-primary-purple/30 bg-white/50 dark:bg-dark-surface/50">
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-hard-gray">Date</th>
                      <th className="hidden sm:table-cell px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-hard-gray">Description</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-hard-gray sm:hidden">Transfer</th>
                      <th className="hidden sm:table-cell px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-hard-gray">From</th>
                      <th className="hidden sm:table-cell px-3 py-3"></th>
                      <th className="hidden sm:table-cell px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-hard-gray">To</th>
                      <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-hard-gray">Amount</th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTr.map((t) => (
                      <tr key={t.id} className="border-b border-gray-100 dark:border-gray-800/50 last:border-0 hover:bg-primary-purple/5 dark:hover:bg-primary-purple/10 transition-colors">
                        <td className="px-3 py-3 text-hard-gray whitespace-nowrap">{formatDate(t.date)}</td>
                        <td className="hidden sm:table-cell px-3 py-3 dark:text-white max-w-[140px] truncate">
                          {t.description ?? <span className="text-hard-gray italic">No description</span>}
                        </td>
                        <td className="sm:hidden px-3 py-3 text-hard-gray text-xs whitespace-nowrap">
                          {t.fromAccountName} → {t.toAccountName}
                        </td>
                        <td className="hidden sm:table-cell px-3 py-3 text-hard-gray whitespace-nowrap">{t.fromAccountName}</td>
                        <td className="hidden sm:table-cell px-3 py-3">
                          <ArrowLeftRight size={14} className="text-primary-purple" />
                        </td>
                        <td className="hidden sm:table-cell px-3 py-3 text-hard-gray whitespace-nowrap">{t.toAccountName}</td>
                        <td className="px-3 py-3 font-bold text-primary-purple-light whitespace-nowrap">
                          {formatAmount(t.amount)}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex gap-1">
                            <button onClick={() => { setSelectedTr(t); setTrDrawerMode("edit"); setTrDrawerOpen(true); }}
                              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors cursor-pointer">
                              <Pencil size={14} className="text-primary-purple" />
                            </button>
                            <button onClick={() => { setTrToDelete(t); setTrDeleteOpen(true); }}
                              className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer">
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
          </>
        )
      )}

      {/* Drawers y modales de transacciones */}
      <TransactionDrawer
        isOpen={txDrawerOpen}
        onClose={() => setTxDrawerOpen(false)}
        onSubmit={handleTxSubmit}
        mode={txDrawerMode}
        transaction={selectedTx}
        isLoading={txCreating || txUpdating}
      />
      <TransactionDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleTxDelete}
        isDeleting={txDeleting}
      />

      {/* Drawers y modales de transferencias */}
      <TransferDrawer
        isOpen={trDrawerOpen}
        onClose={() => setTrDrawerOpen(false)}
        onSubmit={handleTrSubmit}
        mode={trDrawerMode}
        transfer={selectedTr}
        isLoading={trCreating || trUpdating}
      />
      <TransactionDeleteModal
        isOpen={trDeleteOpen}
        onClose={() => setTrDeleteOpen(false)}
        onConfirm={handleTrDelete}
        isDeleting={trDeleting}
      />
    </div>
  );
}
