import { Calculator } from "lucide-react";
import PageHeader from "@/app/components/molecules/PageHeader";
import BudgetsSection from "./components/BudgetsSection";

export default function BudgetsPage() {
  return (
    <div className="w-full px-4 pt-14 pb-6 md:px-6 md:py-8 flex flex-col gap-8">
      <PageHeader
        title="Presupuestos"
        description="Controla tus límites de gasto por categoría"
        icon={<Calculator size={28} className="text-primary-purple" />}
      />
      <BudgetsSection />
    </div>
  );
}
