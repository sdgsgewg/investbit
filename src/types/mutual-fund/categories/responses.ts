import { Category } from "./database";

// Helper

export type CategoryResponse = Pick<Category, "id" | "name">;
