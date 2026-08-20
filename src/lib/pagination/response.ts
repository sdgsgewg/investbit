import { PaginatedResponse } from "@/types/api";

export function createPaginatedResponse<T>({
  items,
  count,
  page,
  limit,
}: {
  items: T[];
  count: number | null;
  page: number;
  limit: number;
}): PaginatedResponse<T> {
  return {
    items,
    total: count ?? 0,
    page,
    limit,
    totalPages: Math.ceil((count ?? 0) / limit),
  };
}
