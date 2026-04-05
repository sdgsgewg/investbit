import { z } from "zod";

// UUID validation
const uuid = z.string().uuid();

// CREATE
export const createItemSchema = z.object({
  category_id: uuid,
  name: z.string().min(1).max(255),
});

// UPDATE
export const updateItemSchema = z.object({
  id: uuid,
  category_id: uuid,
  name: z.string().min(1).max(255),
});

// Single record item
export const itemSchema = z.object({
  category_id: uuid,
  name: z.string().min(1).max(255),
});

// Array schema
export const itemsSchema = z.array(itemSchema).min(1);

// Query params schema
export const itemsQuerySchema = z.object({
  name: z.string().trim().min(1).max(255).optional(), // item name
  category_id: uuid.optional(),
});
