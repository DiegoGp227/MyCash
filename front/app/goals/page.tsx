import { Goal } from "lucide-react";
import ComingSoon from "@/app/components/molecules/ComingSoon";

export default function GoalsPage() {
  return <ComingSoon title="Metas" icon={<Goal size={48} className="text-primary-purple" />} />;
}
