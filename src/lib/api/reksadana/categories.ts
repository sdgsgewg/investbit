import { CategoryListItem } from "@/types/reksadana/category";
import { apiClient } from "../client";
import { createCategorySchema, updateCategorySchema } from "@/lib/validations/reksadana/categories.schema";

const baseRoute = "/reksadana/categories";

export const fetchCategories = async (): Promise<CategoryListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: CategoryListItem[];
  }>(baseRoute);

  return data.data;
};

export const createCategory = async (payload: unknown) => {
  const parsed = createCategorySchema.parse(payload); // validation

  await apiClient.post(baseRoute, parsed);
};

export const updateCategory = async (id: string, payload: unknown) => {
  const parsed = updateCategorySchema.parse(payload); // validation

  await apiClient.put(`${baseRoute}/${id}`, parsed);
};

export const deleteCategory = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
