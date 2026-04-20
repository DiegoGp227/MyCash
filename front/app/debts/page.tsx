import { Receipt } from "lucide-react";
import PageHeader from "@/app/components/molecules/PageHeader";
import DebtsSection from "./components/DebtsSection";

export default function DebtsPage() {
  return (
    <div className="w-full px-4 pt-14 pb-6 md:px-6 md:py-8 flex flex-col gap-8">
      <PageHeader
        title="Deudas"
        description="Manage your debts and credits"
        icon={<Receipt size={28} className="text-primary-purple" />}
      />
      <DebtsSection />
    </div>
  );
}
