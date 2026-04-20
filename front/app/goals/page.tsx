import { Goal } from "lucide-react";
import PageHeader from "@/app/components/molecules/PageHeader";
import GoalsSection from "./components/GoalsSection";

export default function GoalsPage() {
  return (
    <div className="w-full px-4 pt-14 pb-6 md:px-6 md:py-8 flex flex-col gap-8">
      <PageHeader
        title="Metas"
        description="Track your savings goals"
        icon={<Goal size={28} className="text-primary-purple" />}
      />
      <GoalsSection />
    </div>
  );
}
