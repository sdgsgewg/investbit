import z from "zod";
import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";
import {
  createCategorySchema,
  categoriesQuerySchema,
  categoryMutationSchema,
  updateCategorySchema,
} from "@/lib/validations/reksadana/categories.schema";

// Supabase Table
export type Category = Tables<"rd_categories">;
export type CategoryInsert = TablesInsert<"rd_categories">;
export type CategoryUpdate = TablesUpdate<"rd_categories">;

// Repo Request (from zod)
export type GetCategoriesParams = z.infer<typeof categoriesQuerySchema>;
export type CategoryCreateInput = z.infer<typeof createCategorySchema>;
export type CategoryUpdateInput = z.infer<typeof updateCategorySchema>;

// DTO helper

// API Response DTO
export type CategoryListItem = Category;
export type CategoryDetailResponse = Category;

// Mutation
export type UpsertCategoryInput = z.infer<typeof categoryMutationSchema> & {
  id?: string;
};

// Others
