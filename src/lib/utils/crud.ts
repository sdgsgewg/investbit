import { SortOrder } from "@/types/sort";
import { ReadonlyURLSearchParams } from "next/navigation";
import z from "zod";

export function parseSearchParams<T extends z.ZodType>(
  searchParams: ReadonlyURLSearchParams,
  schema: T,
): z.infer<T> {
  return schema.parse(Object.fromEntries(searchParams.entries()));
}

export function hasFilterChanged<T extends object>(keys: readonly (keyof T)[]) {
  return (previous: T, next: T): boolean => {
    return keys.some((key) => previous[key] !== next[key]);
  };
}

interface CreateSortHandlerOptions<TSortBy extends string> {
  sortBy: TSortBy;
  sortOrder: SortOrder;
  updateFiltersPartial: (
    values: Partial<{
      sortBy: TSortBy;
      sortOrder: SortOrder;
    }>,
  ) => void;
}

export function createSortHandler<TSortBy extends string>({
  sortBy,
  sortOrder,
  updateFiltersPartial,
}: CreateSortHandlerOptions<TSortBy>) {
  return (column: string) => {
    if (column === sortBy) {
      updateFiltersPartial({
        sortOrder: sortOrder === "asc" ? "desc" : "asc",
      });
    } else {
      updateFiltersPartial({
        sortBy: column as TSortBy,
        sortOrder: "asc",
      });
    }
  };
}
