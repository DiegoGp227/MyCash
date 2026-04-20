import { Tags } from "lucide-react";
import CategoriesOrganism from "./components/organism/CategoriesOrganism";
import PageHeader from "@/app/components/molecules/PageHeader";

export default function CategoryPage() {
  return (
    <div className="w-full px-4 pt-14 pb-6 md:px-6 md:py-8 flex flex-col gap-8">
      <PageHeader
        title="Categories"
        description="Organize your transactions by category"
        icon={<Tags size={28} className="text-primary-purple" />}
      />
      <CategoriesOrganism />
    </div>
  );
}
