// Tipos para las categorías

export type CategoryType = "INCOME" | "EXPENSE";

// Respuesta de una categoría del backend
export interface ICategory {
  id: string;
  name: string;
  color: string;
  icon?: string;
  type: CategoryType;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  subcategoriesCount: number;
}

// Para crear una categoría (POST)
export interface ICreateCategory {
  name: string;
  color: string;
  icon?: string;
  type: CategoryType;
}

// Para actualizar una categoría (PATCH)
export interface IUpdateCategory {
  name?: string;
  color?: string;
  icon?: string;
}

// Respuesta del GET /categories
export interface ICategoriesResponse {
  categories: ICategory[];
}

// Respuesta del POST/PATCH /categories
export interface ICategoryResponse {
  message: string;
  category: ICategory;
}
