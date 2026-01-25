import { Star } from "lucide-react";

interface IHeaderCard {
  titleCategory: string;
  subCategoriesNumber: number;
}

export default function HeaderCard({
  subCategoriesNumber,
  titleCategory,
}: IHeaderCard) {
  return (
    <div className="flex border-b border-gray-300 justify-between p-2 dark:border-primary-purple">
      <div className="w-12 h-12 text-4xl flex items-center justify-center bg-amber-300 rounded">
        🫩
      </div>
      <div>
        <p className="font-bold text-2xl">{titleCategory}</p>
        <p>{subCategoriesNumber} subcategorías</p>
      </div>
      <div className="flex justify-center items-center">
        <button>
          <Star />
        </button>
      </div>
    </div>
  );
}
