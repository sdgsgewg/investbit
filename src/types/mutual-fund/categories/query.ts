import { Category } from "./database";

// Helper

export type DbCategoryRow = Pick<Category, "id" | "name">;
