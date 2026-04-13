import { Receipt } from "lucide-react";
import ComingSoon from "@/app/components/molecules/ComingSoon";

export default function DebtsPage() {
  return <ComingSoon title="Deudas" icon={<Receipt size={48} className="text-primary-purple" />} />;
}
