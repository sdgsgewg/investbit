import {
  createItemSchema,
  groupedItemsQuerySchema,
  itemMutationSchema,
  itemsQuerySchema,
  updateItemSchema,
} from "@/lib/validations/mutual-fund/items.schema";
import z from "zod";

/**
 * Input dari client (dari URL / API route)
 */
export type ItemQuery = Partial<z.input<typeof itemsQuerySchema>>;

/**
 * Khusus dipakai setelah parse, termasuk state React
 */
export type ItemFilter = z.infer<typeof itemsQuerySchema>;

export type GroupedItemQuery = Partial<z.input<typeof groupedItemsQuerySchema>>;

export type GroupedItemFilter = z.infer<typeof groupedItemsQuerySchema>;

export type ItemCreateInput = z.infer<typeof createItemSchema>;
export type ItemUpdateInput = z.infer<typeof updateItemSchema>;

// Mutation

export type UpsertItemInput = z.infer<typeof itemMutationSchema> & {
  id?: string;
};
