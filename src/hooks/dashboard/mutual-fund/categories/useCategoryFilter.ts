import { useFilters } from "@/hooks/filter";
import { parseSearchParams } from "@/lib/utils/crud";
import { categoriesQuerySchema } from "@/lib/validations/mutual-fund/categories.schema";
import { CategoryFilter } from "@/types/mutual-fund/categories";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const DEFAULT_FILTER: CategoryFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export function useCategoryFilter() {
  const searchParams = useSearchParams();

  const initialFilter = useMemo(
    () => parseSearchParams(searchParams, categoriesQuerySchema),
    [searchParams],
  );

  const crud = useFilters(DEFAULT_FILTER, {
    initialFilter,
    omitDefaultValuesFromUrl: true,
  });

  return {
    defaultFilters: DEFAULT_FILTER,
    ...crud,
  };
}
