"use client";

import { X } from "lucide-react";
import Portal from "@/app/categories/components/Atoms/Portal";
import Backdrop from "@/app/categories/components/Atoms/Backdrop";
import DebtForm from "./DebtForm";
import PaymentForm from "./PaymentForm";
import type { IDebt, ICreateDebt, IUpdateDebt, ICreatePayment } from "@/src/debts/types/debts.types";

type DrawerMode = "create" | "edit" | "pay";

interface DebtDrawerBaseProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
}

interface DebtDrawerCreateProps extends DebtDrawerBaseProps {
  mode: "create";
  onSubmit: (data: ICreateDebt) => Promise<void>;
}

interface DebtDrawerEditProps extends DebtDrawerBaseProps {
  mode: "edit";
  debt: IDebt;
  onSubmit: (data: IUpdateDebt) => Promise<void>;
}

interface DebtDrawerPayProps extends DebtDrawerBaseProps {
  mode: "pay";
  debtName: string;
  remainingAmount: number;
  onSubmit: (data: ICreatePayment) => Promise<void>;
}

type DebtDrawerProps = DebtDrawerCreateProps | DebtDrawerEditProps | DebtDrawerPayProps;

const titles: Record<DrawerMode, string> = {
  create: "New Debt",
  edit: "Edit Debt",
  pay: "Record Payment",
};

export default function DebtDrawer(props: DebtDrawerProps) {
  if (!props.isOpen) return null;

  return (
    <Portal>
      <Backdrop onClick={props.onClose} />
      <div
        className="fixed top-0 right-0 h-full w-full md:max-w-md bg-white dark:bg-dark-surface z-50 shadow-xl flex flex-col"
        style={{ animation: "slideInFromRight 0.3s ease-out" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-dark-border sticky top-0 bg-white dark:bg-dark-surface">
          <div>
            <h2 className="text-xl font-bold dark:text-white">{titles[props.mode]}</h2>
            {props.mode === "pay" && (
              <p className="text-sm text-hard-gray">{props.debtName}</p>
            )}
          </div>
          <button
            onClick={props.onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-bg cursor-pointer transition-colors"
          >
            <X className="dark:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {props.mode === "create" && (
            <DebtForm mode="create" onSubmit={props.onSubmit} onCancel={props.onClose} isLoading={props.isLoading} />
          )}
          {props.mode === "edit" && (
            <DebtForm mode="edit" debt={props.debt} onSubmit={props.onSubmit} onCancel={props.onClose} isLoading={props.isLoading} />
          )}
          {props.mode === "pay" && (
            <PaymentForm
              maxAmount={props.remainingAmount}
              onSubmit={props.onSubmit}
              onCancel={props.onClose}
              isLoading={props.isLoading}
            />
          )}
        </div>
      </div>
    </Portal>
  );
}
