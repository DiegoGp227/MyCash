import { Calculator } from "lucide-react";
import ComingSoon from "@/app/components/molecules/ComingSoon";
import PageHeader from "@/app/components/molecules/PageHeader";

export default function BudgetsPage() {
  return (
    <div className="w-full px-6 py-8 flex flex-col gap-8">
      <PageHeader
        title="Presupuestos"
        description="Controla tus límites de gasto por categoría"
        icon={<Calculator size={28} className="text-primary-purple" />}
      />
      <ComingSoon icon={<Calculator size={48} className="text-primary-purple" />} />
    </div>
  );
}
