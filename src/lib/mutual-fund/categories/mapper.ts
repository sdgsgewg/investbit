import {
  CategoryDetailResponse,
  CategoryListResponse,
  CategoryResponse,
  DbCategoryDetailRow,
  DbCategoryListRow,
  DbCategoryRow,
} from "@/types/mutual-fund/categories";

/**
 *
 * @param category
 * @returns categoryListcategory
 */
export function mapCategoryListResponse(
  category: DbCategoryListRow,
): CategoryListResponse {
  const { id, name } = category;

  return {
    id,
    name,
  };
}

export function mapCategoryDetailResponse(
  category: DbCategoryDetailRow,
): CategoryDetailResponse {
  const { id, name } = category;

  return {
    id,
    name,
  };
}
// Helper

export function mapCategoryResponse(category: DbCategoryRow): CategoryResponse {
  const { id, name } = category;

  return {
    id,
    name,
  };
}
