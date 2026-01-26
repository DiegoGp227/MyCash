import CategoriesSecction from "./CategoriesSecction";

export default function CategoriesSistem() {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-20">
      <CategoriesSecction title="💚 Categorías de Ingresos" type="INCOME" />
      <CategoriesSecction title="💚 Categorías de egresos" type="EXPENSE" />
    </div>
  );
}
