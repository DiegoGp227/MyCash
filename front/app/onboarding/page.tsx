"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStoreState } from "@/store/hooks";
import OnboardingWizard from "./components/OnboardingWizard";
import { accountsService } from "@/src/accounts/services/accountsService";
import useSWR from "swr";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAppStoreState((state) => state.auth);

  // Si el usuario ya tiene cuentas, no necesita onboarding
  const { data, isLoading } = useSWR("accounts-check", () =>
    accountsService.getAccounts()
  );

  useEffect(() => {
    if (!isLoading && data && data.accounts.length > 0) {
      router.replace("/");
    }
  }, [data, isLoading, router]);

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-400 text-sm">Cargando...</div>
      </div>
    );
  }

  // Si ya tiene cuentas, no renderizar el wizard (el useEffect redirige)
  if (data && data.accounts.length > 0) return null;

  return (
    <div className="flex items-center justify-center min-h-screen py-10 px-4">
      <OnboardingWizard userName={user.userInfo.name} />
    </div>
  );
}
