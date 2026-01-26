import ContentCategories from "../Molecules/ContentCategories";
import HeaderCategories from "../Molecules/HeaderCategories";

interface ICategoriesSecctionProps {
  title: string;
  type: "EXPENSE" | "INCOME";
}

export default function CategoriesSecction({
  title,
  type,
}: ICategoriesSecctionProps) {
  return (
    <div className="flex flex-col w-7xl p-4 rounded border-2 border-primary-purple bg-gray-bg dark:bg-light-purple-bg gap-5">
      <HeaderCategories title={title} />
      <ContentCategories type={type} />
    </div>
  );
}
