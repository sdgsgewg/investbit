import { apiClient } from "./client";
import { RecordData } from "@/types/reksadana/records/RecordData";
import { recordsSchema } from "../validations/reksadana/records.schema";
import { CategoryListItem } from "@/types/reksadana/category";
import { ItemListItem } from "@/types/reksadana/item";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/reksadana/categories.schema";
import {
  createItemSchema,
  updateItemSchema,
} from "../validations/reksadana/items.schema";
import { CategoryWithItems } from "@/types/reksadana/records/CategoryWithItems";
import { PerformanceResponse } from "@/types/reksadana/performance/PerformanceResponse";

// categories
export const fetchCategories = async () => {
  const { data } = await apiClient.get<CategoryListItem[]>(
    "/reksadana/categories",
  );
  return data;
};

export const createCategory = async (payload: unknown) => {
  const parsed = createCategorySchema.parse(payload); // validation

  await apiClient.post("/reksadana/categories", parsed);
};

export const updateCategory = async (id: string, payload: unknown) => {
  const parsed = updateCategorySchema.parse(payload); // validation

  await apiClient.put(`/reksadana/categories/${id}`, parsed);
};

export const deleteCategory = async (id: string) => {
  await apiClient.delete(`/reksadana/categories/${id}`);
};

// items
export const fetchItems = async () => {
  const { data } = await apiClient.get<ItemListItem[]>("/reksadana/items");
  return data;
};

export const fetchCategoriesWithItems = async () => {
  const { data } = await apiClient.get<CategoryWithItems[]>(
    "/reksadana/items?grouped=true",
  );
  return data;
};

export const createItem = async (payload: unknown) => {
  const parsed = createItemSchema.parse(payload); // validation

  await apiClient.post("/reksadana/items", parsed);
};

export const updateItem = async (id: string, payload: unknown) => {
  const parsed = updateItemSchema.parse(payload); // validation

  await apiClient.put(`/reksadana/items/${id}`, parsed);
};

export const deleteItem = async (id: string) => {
  await apiClient.delete(`/reksadana/items/${id}`);
};

// records
export const fetchRecords = async (date: string) => {
  const { data } = await apiClient.get<RecordData[]>(
    `/reksadana/records?startDate=${date}&endDate=${date}`,
  );
  return data;
};

export const saveRecords = async (payload: unknown) => {
  const parsed = recordsSchema.parse(payload); // validation

  await apiClient.post("/reksadana/records", parsed);
};

// performance
export const fetchPerformance = async (params: {
  timeFrame: string;
  categoryId?: string;
  periodLimit?: number;
  startPeriod?: string;
  endPeriod?: string;
}) => {
  const { data } = await apiClient.get<PerformanceResponse>(
    "/reksadana/recap/performance",
    {
      params: {
        timeFrame: params.timeFrame,
        categoryId: params.categoryId || undefined,
        periodLimit:
          params.startPeriod || params.endPeriod
            ? undefined
            : params.periodLimit,
        startPeriod: params.startPeriod || undefined,
        endPeriod: params.endPeriod || undefined,
      },
    },
  );
  return data;
};
