"use client";

import { useState } from "react";
import { IAccount } from "@/src/accounts/types/accounts.types";
import WelcomeStep from "./steps/WelcomeStep";
import AccountStep from "./steps/AccountStep";
import CategoriesStep from "./steps/CategoriesStep";
import DoneStep from "./steps/DoneStep";

type Step = "welcome" | "account" | "categories" | "done";

const STEPS: Step[] = ["welcome", "account", "categories", "done"];

const STEP_LABELS: Record<Step, string> = {
  welcome: "Bienvenida",
  account: "Cuenta",
  categories: "Categorías",
  done: "Listo",
};

interface OnboardingWizardProps {
  userName: string;
}

export default function OnboardingWizard({ userName }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [createdAccount, setCreatedAccount] = useState<IAccount | null>(null);
  const [categoriesCount, setCategoriesCount] = useState(0);

  const stepIndex = STEPS.indexOf(currentStep);
  const showProgress = currentStep !== "welcome" && currentStep !== "done";

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      {/* Progress bar */}
      {showProgress && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            {STEPS.filter((s) => s !== "welcome" && s !== "done").map((step, i) => {
              const idx = STEPS.indexOf(step);
              const isDone = stepIndex > idx;
              const isCurrent = currentStep === step;
              return (
                <div key={step} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                      isDone
                        ? "bg-primary-purple border-primary-purple text-white"
                        : isCurrent
                        ? "border-primary-purple text-primary-purple bg-transparent"
                        : "border-gray-600 text-gray-600 bg-transparent"
                    }`}
                  >
                    {isDone ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-xs ${
                      isCurrent ? "text-primary-purple" : isDone ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {STEP_LABELS[step]}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="relative h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-primary-purple rounded-full transition-all duration-500"
              style={{
                width: `${((stepIndex - 1) / (STEPS.length - 3)) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Step content */}
      {currentStep === "welcome" && (
        <WelcomeStep
          userName={userName}
          onNext={() => setCurrentStep("account")}
        />
      )}

      {currentStep === "account" && (
        <AccountStep
          onNext={(account) => {
            setCreatedAccount(account);
            setCurrentStep("categories");
          }}
        />
      )}

      {currentStep === "categories" && (
        <CategoriesStep
          onNext={(count) => {
            setCategoriesCount(count);
            setCurrentStep("done");
          }}
          onSkip={() => setCurrentStep("done")}
        />
      )}

      {currentStep === "done" && createdAccount && (
        <DoneStep
          account={createdAccount}
          categoriesCount={categoriesCount}
        />
      )}
    </div>
  );
}
