import { PaginatedResponse } from "@/types/api";
import { CategoryResponse } from "../categories";
import { Item } from "./database";

// API Response DTO

// Mutual Fund Item List

export interface ItemListItem extends Pick<Item, "id" | "name"> {
  category: CategoryResponse;
}

export type ItemListResponse = PaginatedResponse<ItemListItem>;

export interface GroupedItemListItem {
  category: CategoryResponse;
  items: ItemListItem[];
}

// Mutual Fund Item Detail

export type ItemDetailResponse = Pick<Item, "id" | "name"> & {
  category: CategoryResponse;
};

// Helper for other entity

export type ItemResponse = Pick<Item, "id" | "name"> & {
  category: CategoryResponse;
};
