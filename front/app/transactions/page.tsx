import { ArrowLeftRight } from "lucide-react";
import TransactionsSection from "./components/TransactionsSection";
import PageHeader from "@/app/components/molecules/PageHeader";

export default function TransactionPage() {
  return (
    <div className="w-full px-4 pt-14 pb-6 md:px-6 md:py-8 flex flex-col gap-8">
      <PageHeader
        title="Transacciones"
        description="History of your income and expenses"
        icon={<ArrowLeftRight size={28} className="text-primary-purple" />}
      />
      <TransactionsSection />
    </div>
  );
}
