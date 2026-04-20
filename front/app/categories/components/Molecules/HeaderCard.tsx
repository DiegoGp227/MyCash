import { resolveIcon } from "@/src/utils/resolveIcon";

interface IHeaderCard {
  titleCategory: string;
  subCategoriesNumber: number;
  color: string;
  icon?: string;
}

export default function HeaderCard({
  subCategoriesNumber,
  titleCategory,
  color,
  icon,
}: IHeaderCard) {
  return (
    <div className="flex border-b border-gray-300 justify-between p-2 dark:border-primary-purple gap-2">
      <div
        className="w-12 h-12 text-4xl flex items-center justify-center rounded shrink-0"
        style={{ backgroundColor: color }}
      >
        {resolveIcon(icon)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-2xl truncate">{titleCategory}</p>
        <p>{subCategoriesNumber} subcategories</p>
      </div>
    </div>
  );
}
