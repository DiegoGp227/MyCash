import CategoriesSecction from "./CategoriesSecction";

export default function CategoriesSistem() {
  return (
    <div className="flex flex-col w-full gap-6">
      <CategoriesSecction title="Income Categories" type="INCOME" />
      <CategoriesSecction title="Expense Categories" type="EXPENSE" />
    </div>
  );
}
