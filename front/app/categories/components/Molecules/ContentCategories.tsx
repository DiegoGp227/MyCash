import CategoryCard from "./CategoryCard";

export default function ContentCategories() {
  return (
    <div className="flex gap-5 flex-wrap justify-center items-center">
      <CategoryCard subCategoriesNumber={4} titleCategory="Salario" />
      <CategoryCard subCategoriesNumber={4} titleCategory="Salario" />
      <CategoryCard subCategoriesNumber={4} titleCategory="Salario" />
      <CategoryCard subCategoriesNumber={4} titleCategory="Salario" />
      <CategoryCard subCategoriesNumber={4} titleCategory="Salario" />
      <CategoryCard subCategoriesNumber={4} titleCategory="Salario" />
      <CategoryCard subCategoriesNumber={4} titleCategory="Salario" />
    </div>
  );
}
