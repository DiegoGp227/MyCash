import { Receipt } from "lucide-react";
import ComingSoon from "@/app/components/molecules/ComingSoon";
import PageHeader from "@/app/components/molecules/PageHeader";

export default function DebtsPage() {
  return (
    <div className="w-full px-6 py-8 flex flex-col gap-8">
      <PageHeader
        title="Deudas"
        description="Gestiona tus deudas y créditos"
        icon={<Receipt size={28} className="text-primary-purple" />}
      />
      <ComingSoon icon={<Receipt size={48} className="text-primary-purple" />} />
    </div>
  );
}
