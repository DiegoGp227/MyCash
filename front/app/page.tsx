import { House } from "lucide-react";
import DashboardOrganism from "./components/organism/DashboardOrganism";
import PageHeader from "./components/molecules/PageHeader";

export default function HomePage() {
  return (
    <div className="w-full px-6 py-8 flex flex-col gap-8">
      <PageHeader
        title="Dashboard"
        description="Resumen de tu situación financiera"
        icon={<House size={28} className="text-primary-purple" />}
      />
      <DashboardOrganism />
    </div>
  );
}
