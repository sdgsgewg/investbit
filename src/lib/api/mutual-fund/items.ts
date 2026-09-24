import {
  GroupedItemListResponse,
  GroupedItemQuery,
  ItemEditResponse,
  ItemListPaginatedResponse,
  ItemQuery,
} from "@/types/mutual-fund/items";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api";

const baseRoute = "/mutual-fund/items";

export const fetchItems = async (
  params?: ItemQuery,
): Promise<ItemListPaginatedResponse> => {
  const { data } = await apiClient.get<ApiResponse<ItemListPaginatedResponse>>(
    baseRoute,
    {
      params,
    },
  );

  return data.data;
};

export const fetchGroupedItems = async (
  params?: GroupedItemQuery,
): Promise<GroupedItemListResponse[]> => {
  const { data } = await apiClient.get<ApiResponse<GroupedItemListResponse[]>>(
    `${baseRoute}/grouped`,
    {
      params,
    },
  );

  return data.data;
};

export const fetchItemEdit = async (id: string): Promise<ItemEditResponse> => {
  const { data } = await apiClient.get<ApiResponse<ItemEditResponse>>(
    `${baseRoute}/${id}/edit`,
  );

  return data.data;
};

export const createItem = async (payload: unknown) => {
  await apiClient.post(baseRoute, payload);
};

export const updateItem = async (id: string, payload: unknown) => {
  await apiClient.put(`${baseRoute}/${id}`, payload);
};

export const deleteItem = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
