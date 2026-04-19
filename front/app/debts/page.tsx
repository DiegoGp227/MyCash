import { Receipt } from "lucide-react";
import PageHeader from "@/app/components/molecules/PageHeader";
import DebtsSection from "./components/DebtsSection";

export default function DebtsPage() {
  return (
    <div className="w-full px-6 py-8 flex flex-col gap-8">
      <PageHeader
        title="Deudas"
        description="Gestiona tus deudas y créditos"
        icon={<Receipt size={28} className="text-primary-purple" />}
      />
      <DebtsSection />
    </div>
  );
}
