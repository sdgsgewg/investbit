import { Category } from "./database";

// API Response DTO

// Mutual Fund Category List

export type CategoryListItem = Pick<Category, "id" | "name">;

// Mutual Fund Category Detail

export type CategoryDetailResponse = Pick<Category, "id" | "name">;

// Helper

export type CategoryResponse = Pick<Category, "id" | "name">;
