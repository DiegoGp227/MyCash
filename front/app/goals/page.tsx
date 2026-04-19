import { Goal } from "lucide-react";
import ComingSoon from "@/app/components/molecules/ComingSoon";
import PageHeader from "@/app/components/molecules/PageHeader";

export default function GoalsPage() {
  return (
    <div className="w-full px-6 py-8 flex flex-col gap-8">
      <PageHeader
        title="Metas"
        description="Rastrea tus objetivos de ahorro"
        icon={<Goal size={28} className="text-primary-purple" />}
      />
      <ComingSoon icon={<Goal size={48} className="text-primary-purple" />} />
    </div>
  );
}
