"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useAccounts } from "@/src/accounts/hooks/useAccounts";
import type { IAccount } from "@/src/accounts/types/accounts.types";
import type { AccountFormInput } from "@/src/accounts/schemas/account.schema";
import AccountCard from "./AccountCard";
import AccountDrawer from "./AccountDrawer";
import AccountDeleteModal from "./AccountDeleteModal";

export default function AccountsSection() {
  const {
    accounts,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    fetchAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
  } = useAccounts();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<IAccount | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const openCreate = () => {
    setSelectedAccount(null);
    setDrawerMode("create");
    setDrawerOpen(true);
  };

  const openEdit = (account: IAccount) => {
    setSelectedAccount(account);
    setDrawerMode("edit");
    setDrawerOpen(true);
  };

  const openDelete = (account: IAccount) => {
    setAccountToDelete(account);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async (data: AccountFormInput) => {
    if (drawerMode === "create") {
      await createAccount({
        name: data.name,
        type: data.type,
        balance: data.balance,
        color: data.color || undefined,
        icon: data.icon || undefined,
      });
    } else if (selectedAccount) {
      await updateAccount(selectedAccount.id, {
        name: data.name,
        balance: data.balance,
        color: data.color || undefined,
        icon: data.icon || undefined,
      });
    }
    setDrawerOpen(false);
  };

  const handleDelete = async () => {
    if (!accountToDelete) return;
    await deleteAccount(accountToDelete.id);
    setDeleteModalOpen(false);
    setAccountToDelete(null);
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const formattedTotal = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(totalBalance);

  return (
    <div className="flex flex-col w-full max-w-5xl gap-5 p-4 rounded border-2 border-primary-purple bg-gray-bg dark:bg-light-purple-bg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold dark:text-white">Mis Cuentas</h2>
          {accounts.length > 0 && (
            <p className="text-sm text-hard-gray">
              Balance total: <span className="font-semibold text-primary-purple">{formattedTotal}</span>
            </p>
          )}
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded bg-primary-purple text-white font-semibold hover:bg-primary-purple-hover transition-colors cursor-pointer"
        >
          <Plus size={18} />
          Nueva Cuenta
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <span className="text-hard-gray">Cargando cuentas...</span>
        </div>
      ) : accounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
          <p className="text-hard-gray">No tienes cuentas registradas.</p>
          <p className="text-sm text-hard-gray">
            Crea tu primera cuenta para empezar a registrar transacciones.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onEdit={openEdit}
              onDelete={openDelete}
            />
          ))}
        </div>
      )}

      {/* Drawer */}
      <AccountDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
        mode={drawerMode}
        account={selectedAccount}
        isLoading={isCreating || isUpdating}
      />

      {/* Delete modal */}
      <AccountDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        accountName={accountToDelete?.name ?? ""}
        isDeleting={isDeleting}
      />
    </div>
  );
}
