import { CategoryResponse } from "../categories";
import { Item } from "./database";

// Helper for other entity

export type ItemResponse = Pick<Item, "id" | "name"> & {
  category: CategoryResponse;
};
