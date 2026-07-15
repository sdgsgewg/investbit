import { ItemListItem } from "@/types/reksadana/item";
import { apiClient } from "../client";
import {
  createItemSchema,
  updateItemSchema,
} from "@/lib/validations/reksadana/items.schema";

const baseRoute = "/reksadana/items";

export const fetchItems = async (): Promise<ItemListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: ItemListItem[];
  }>(baseRoute);
  
  return data.data;
};

export const createItem = async (payload: unknown) => {
  const parsed = createItemSchema.parse(payload); // validation

  await apiClient.post(baseRoute, parsed);
};

export const updateItem = async (id: string, payload: unknown) => {
  const parsed = updateItemSchema.parse(payload); // validation

  await apiClient.put(`${baseRoute}/${id}`, parsed);
};

export const deleteItem = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
