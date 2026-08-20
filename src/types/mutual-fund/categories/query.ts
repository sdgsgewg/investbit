import { Category } from "./database";

// Supabase query result

// Category List

export type DbCategoryListRow = Pick<Category, "id" | "name">;

// Category Detail

export type DbCategoryDetailRow = Category;

// Helper

export type DbCategoryRow = Pick<Category, "id" | "name">;
