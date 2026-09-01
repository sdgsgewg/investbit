import { z } from "zod";
import { idSchema } from "../primitives.schema";
import {
  baseQuerySchema,
  listQuerySchema,
  sortingQuerySchema,
} from "../query.schema";
import { itemSortBySchema } from "../enums.schema";

export const itemMutationSchema = z.object({
  name: z.string().min(1).max(255),
  category_id: idSchema,
  total_aum: z.number().positive().nullable(),
});

// CREATE
export const createItemSchema = itemMutationSchema;

// UPDATE
export const updateItemSchema = itemMutationSchema;

// Single record item
export const itemSchema = itemMutationSchema.extend({
  id: idSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

// Array schema
export const itemsSchema = z.array(itemSchema).min(1);

export const itemsQuerySchema = listQuerySchema.extend({
  categoryId: idSchema.optional(),

  sortBy: itemSortBySchema.default("name"),
});

export const groupedItemsQuerySchema = baseQuerySchema
  .merge(sortingQuerySchema)
  .extend({
    categoryId: idSchema.optional(),

    sortBy: itemSortBySchema.default("name"),
  });
