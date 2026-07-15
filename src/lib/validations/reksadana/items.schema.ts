import { z } from "zod";

// UUID validation
const uuidSchema = z.string().uuid();
export const itemIdSchema = uuidSchema;

export const itemMutationSchema = z.object({
  category_id: uuidSchema,
  name: z.string().min(1).max(255),
});

// CREATE
export const createItemSchema = itemMutationSchema;

// UPDATE
export const updateItemSchema = itemMutationSchema;

// Single record item
export const itemSchema = itemMutationSchema.extend({
  id: itemIdSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

// Array schema
export const itemsSchema = z.array(itemSchema).min(1);

// Query params schema
export const itemsQuerySchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
  category_id: uuidSchema.optional(),
});
