import { House } from "lucide-react";
import DashboardOrganism from "./components/organism/DashboardOrganism";
import PageHeader from "./components/molecules/PageHeader";

export default function HomePage() {
  return (
    <div className="w-full px-4 pt-14 pb-6 md:px-6 md:py-8 flex flex-col gap-8">
      <PageHeader
        title="Dashboard"
        description="Resumen de tu situación financiera"
        icon={<House size={28} className="text-primary-purple" />}
      />
      <DashboardOrganism />
    </div>
  );
}
