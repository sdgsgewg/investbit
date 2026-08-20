import { z } from "zod";
import { baseQuerySchema, sortingQuerySchema } from "../query.schema";
import { categorySortBySchema } from "../enums.schema";

export const categoryIdSchema = z.string().uuid();

export const categoryMutationSchema = z.object({
  name: z.string().min(1).max(255),
});

// CREATE
export const createCategorySchema = categoryMutationSchema;

// UPDATE
export const updateCategorySchema = categoryMutationSchema;

// Single reco category
export const categorySchema = categoryMutationSchema.extend({
  id: categoryIdSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

// ARRAY schema
export const categoriesSchema = z.array(categorySchema).min(1);

export const categoriesQuerySchema = baseQuerySchema
  .merge(sortingQuerySchema)
  .extend({
    sortBy: categorySortBySchema.default("name"),
  });
