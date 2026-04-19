import { ArrowLeftRight } from "lucide-react";
import TransactionsSection from "./components/TransactionsSection";
import PageHeader from "@/app/components/molecules/PageHeader";

export default function TransactionPage() {
  return (
    <div className="w-full px-6 py-8 flex flex-col gap-8">
      <PageHeader
        title="Transacciones"
        description="Historial de tus ingresos y gastos"
        icon={<ArrowLeftRight size={28} className="text-primary-purple" />}
      />
      <TransactionsSection />
    </div>
  );
}
