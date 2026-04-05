import { z } from "zod";

const uuid = z.string().uuid();

// CREATE
export const createCategorySchema = z.object({
  name: z.string().min(1).max(255),
});

// UPDATE
export const updateCategorySchema = z.object({
  id: uuid,
  name: z.string().min(1).max(255),
});

// Single record category
export const categorySchema = z.object({
  name: z.string().min(1).max(255),
});

// ARRAY schema
export const categoriesSchema = z.array(categorySchema).min(1);

export const categoriesQuerySchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
});
