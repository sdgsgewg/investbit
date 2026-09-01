import {
  CategoryListItem,
  CategoryQuery,
} from "@/types/mutual-fund/categories";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api";
import { Option } from "@/types/option";

const baseRoute = "/mutual-fund/categories";

export const fetchCategories = async (
  params?: CategoryQuery,
): Promise<CategoryListItem[]> => {
  const { data } = await apiClient.get<ApiResponse<CategoryListItem[]>>(
    baseRoute,
    { params },
  );

  return data.data;
};

/**
 *
 * @returns Option[]
 */
export const fetchCategoryOptions = async (): Promise<Option[]> => {
  const { data } = await apiClient.get<ApiResponse<Option[]>>(
    `${baseRoute}/options`,
  );

  return data.data;
};

export const createCategory = async (payload: unknown) => {
  await apiClient.post(baseRoute, payload);
};

export const updateCategory = async (id: string, payload: unknown) => {
  await apiClient.put(`${baseRoute}/${id}`, payload);
};

export const deleteCategory = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
