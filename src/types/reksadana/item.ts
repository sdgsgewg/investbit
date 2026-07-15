import z from "zod";
import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";
import {
  createItemSchema,
  itemMutationSchema,
  itemsQuerySchema,
  updateItemSchema,
} from "@/lib/validations/reksadana/items.schema";

// Supabase Table
export type Item = Tables<"rd_items">;
export type ItemInsert = TablesInsert<"rd_items">;
export type ItemUpdate = TablesUpdate<"rd_items">;

// Repo Request (from zod)
export type GetItemsParams = z.infer<typeof itemsQuerySchema>;
export type ItemCreateInput = z.infer<typeof createItemSchema>;
export type ItemUpdateInput = z.infer<typeof updateItemSchema>;

// DTO helper
type CategorySummary = Pick<Tables<"rd_categories">, "id" | "name">;

// API Response DTO
export interface ItemListItem extends Omit<Item, "category_id"> {
  category: CategorySummary;
}

export interface ItemDetailResponse extends Item {
  category: CategorySummary | null;
}

// Mutation
export type UpsertItemInput = z.infer<typeof itemMutationSchema> & {
  id?: string;
};

// Others
