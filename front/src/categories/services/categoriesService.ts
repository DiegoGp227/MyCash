import { fetcher, postFetcher, putFetcher } from "@/utils/utils";
import { CategoriesURL } from "@/shared/constants/urls";
import {
  ICategoriesResponse,
  ICategoryResponse,
  ICreateCategory,
  IUpdateCategory,
  CategoryType,
} from "../types/categories.types";

export const categoriesService = {
  /**
   * GET /categories
   * Obtiene todas las categorías del usuario
   * @param type - Filtro opcional: "INCOME" | "EXPENSE"
   */
  async getCategories(type?: CategoryType): Promise<ICategoriesResponse> {
    // Construir URL con query params si hay filtro
    const url = new URL(CategoriesURL);
    if (type) {
      url.searchParams.append("type", type);
    }

    const response = await fetcher<ICategoriesResponse>(url.toString());
    return response;
  },

  /**
   * POST /categories
   * Crea una nueva categoría
   */
  async createCategory(data: ICreateCategory): Promise<ICategoryResponse> {
    const url = CategoriesURL.toString();
    const response = await postFetcher<ICategoryResponse>(url, data);
    return response;
  },

  /**
   * PUT /categories/:id
   * Actualiza una categoría existente
   */
  async updateCategory(
    categoryId: string,
    data: IUpdateCategory
  ): Promise<ICategoryResponse> {
    const url = `${CategoriesURL.toString()}/${categoryId}`;
    const response = await putFetcher<ICategoryResponse>(url, data);
    return response;
  },
};
