import {
  categoriesQuerySchema,
  categoryMutationSchema,
  createCategorySchema,
  updateCategorySchema,
} from "@/lib/validations/mutual-fund/categories.schema";
import z from "zod";

/**
 * Input dari client (dari URL / API route)
 */
export type CategoryQuery = Partial<z.input<typeof categoriesQuerySchema>>;

/**
 * Khusus dipakai setelah parse, termasuk state React
 */
export type CategoryFilter = z.infer<typeof categoriesQuerySchema>;

export type CategoryCreateInput = z.infer<typeof createCategorySchema>;
export type CategoryUpdateInput = z.infer<typeof updateCategorySchema>;

// Mutation

export type UpsertCategoryInput = z.infer<typeof categoryMutationSchema> & {
  id?: string;
};
