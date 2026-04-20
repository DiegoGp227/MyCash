import { Wallet } from "lucide-react";
import AccountsSection from "./components/AccountsSection";
import PageHeader from "@/app/components/molecules/PageHeader";

export default function AccountsPage() {
  return (
    <div className="w-full px-4 pt-14 pb-6 md:px-6 md:py-8 flex flex-col gap-8">
      <PageHeader
        title="Cuentas"
        description="Manage your bank and cash accounts"
        icon={<Wallet size={28} className="text-primary-purple" />}
      />
      <AccountsSection />
    </div>
  );
}
