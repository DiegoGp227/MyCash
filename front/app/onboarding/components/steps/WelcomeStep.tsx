"use client";

import { Wallet } from "lucide-react";

interface WelcomeStepProps {
  userName: string;
  onNext: () => void;
}

export default function WelcomeStep({ userName, onNext }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary-purple/10 border-2 border-primary-purple">
        <Wallet size={40} className="text-primary-purple" />
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-hard-gray">
          Welcome, {userName}!
        </h1>
        <p className="text-gray-400 max-w-sm leading-relaxed">
          MyCash helps you keep track of your personal finances.
          In the next steps we&apos;ll set up your space in under a minute.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs text-left">
        {[
          { emoji: "💳", label: "Register your accounts and balances" },
          { emoji: "📂", label: "Organize expenses by categories" },
          { emoji: "📊", label: "Visualize your cash flow" },
        ].map(({ emoji, label }) => (
          <div key={label} className="flex items-center gap-3 text-gray-300">
            <span className="text-xl">{emoji}</span>
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full max-w-xs py-3 rounded bg-primary-purple text-white font-semibold hover:bg-primary-purple-hover transition-colors"
      >
        Start setup
      </button>
    </div>
  );
}
