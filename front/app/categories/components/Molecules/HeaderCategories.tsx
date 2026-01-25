interface IHeaderCategoriesProps {
  title: string;
}

export default function HeaderCategories({ title }: IHeaderCategoriesProps) {
  return (
    <>
      <div className="flex w-full h-15 justify-between items-center border-b border-gray-300 dark:border-primary-purple">
        <div>
          <p className="font-bold text-3xl">{title}</p>
        </div>
        <div>
          <button className="bg-primary-purple py-1 px-3 rounded text-white cursor-pointer">New Categorie</button>
        </div>
      </div>
    </>
  );
}
