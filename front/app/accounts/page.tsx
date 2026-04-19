import { Wallet } from "lucide-react";
import AccountsSection from "./components/AccountsSection";
import PageHeader from "@/app/components/molecules/PageHeader";

export default function AccountsPage() {
  return (
    <div className="w-full px-6 py-8 flex flex-col gap-8">
      <PageHeader
        title="Cuentas"
        description="Administra tus cuentas bancarias y de efectivo"
        icon={<Wallet size={28} className="text-primary-purple" />}
      />
      <AccountsSection />
    </div>
  );
}
