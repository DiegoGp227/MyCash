import ContentCard from "./ContentCard";
import HeaderCard from "./HeaderCard";

interface ICategoryCardProps {
  titleCategory: string;
  subCategoriesNumber: number;
}

export default function CategoryCard({
  titleCategory,
  subCategoriesNumber,
}: ICategoryCardProps) {
  return (
    <div className="w-80 p-4 border-2 border-gray-300 bg-white rounded dark:bg-light-purple-bg dark:border-primary-purple">
      <HeaderCard
        titleCategory={titleCategory}
        subCategoriesNumber={subCategoriesNumber}
      />
      <ContentCard />
    </div>
  );
}
