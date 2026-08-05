import {
  CategoryResponse,
  DbCategoryRow,
} from "@/types/mutual-fund/categories";

// Helper

export function mapCategoryResponse(category: DbCategoryRow): CategoryResponse {
  const { id, name } = category;

  return {
    id,
    name,
  };
}
