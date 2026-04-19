import { Goal } from "lucide-react";
import PageHeader from "@/app/components/molecules/PageHeader";
import GoalsSection from "./components/GoalsSection";

export default function GoalsPage() {
  return (
    <div className="w-full px-6 py-8 flex flex-col gap-8">
      <PageHeader
        title="Metas"
        description="Rastrea tus objetivos de ahorro"
        icon={<Goal size={28} className="text-primary-purple" />}
      />
      <GoalsSection />
    </div>
  );
}
