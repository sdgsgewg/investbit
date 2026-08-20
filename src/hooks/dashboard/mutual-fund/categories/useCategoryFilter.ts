import { useCrudFilters } from "@/hooks/crud";
import { CategoryFilter } from "@/types/mutual-fund/categories";

const DEFAULT_FILTER: CategoryFilter = {
  search: "",

  sortBy: "name",
  sortOrder: "asc",
};

export function useCategoryFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
