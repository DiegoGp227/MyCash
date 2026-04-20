interface IHeaderCategoriesProps {
  title: string;
  onNewCategory: () => void;
}

export default function HeaderCategories({ title, onNewCategory }: IHeaderCategoriesProps) {
  return (
    <>
      <div className="flex w-full h-15 justify-between items-center border-b border-gray-300 dark:border-primary-purple">
        <div>
          <p className="font-bold text-3xl">{title}</p>
        </div>
        <div>
          <button
            onClick={onNewCategory}
            className="bg-primary-purple py-1 px-3 rounded text-white cursor-pointer hover:bg-primary-purple-hover transition-colors"
          >
            New Category
          </button>
        </div>
      </div>
    </>
  );
}
