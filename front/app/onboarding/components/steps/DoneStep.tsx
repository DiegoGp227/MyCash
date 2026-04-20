"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { IAccount } from "@/src/accounts/types/accounts.types";
import { ACCOUNT_TYPE_LABELS } from "@/src/accounts/types/accounts.types";

interface DoneStepProps {
  account: IAccount;
  categoriesCount: number;
}

export default function DoneStep({ account, categoriesCount }: DoneStepProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500">
        <CheckCircle size={40} className="text-green-500" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-hard-gray">All set!</h2>
        <p className="text-gray-400 text-sm max-w-xs">
          Your space is configured. You can now start recording your transactions.
        </p>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-white/5 border border-gray-700 rounded-lg px-4 py-3">
          <span className="text-green-500 text-xl">✓</span>
          <div className="text-left">
            <p className="text-hard-gray text-sm font-semibold">{account.name}</p>
            <p className="text-gray-500 text-xs">{ACCOUNT_TYPE_LABELS[account.type]} created</p>
          </div>
        </div>

        {categoriesCount > 0 && (
          <div className="flex items-center gap-3 bg-white/5 border border-gray-700 rounded-lg px-4 py-3">
            <span className="text-green-500 text-xl">✓</span>
            <div className="text-left">
              <p className="text-hard-gray text-sm font-semibold">
                {categoriesCount} categor{categoriesCount !== 1 ? "ies" : "y"} created
              </p>
              <p className="text-gray-500 text-xs">Ready to classify transactions</p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => router.push("/")}
        className="w-full max-w-xs py-3 rounded bg-primary-purple text-white font-semibold hover:bg-primary-purple-hover transition-colors"
      >
        Go to dashboard
      </button>
    </div>
  );
}
