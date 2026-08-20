import { useCrudFilters, useCrudPagination } from "@/hooks/crud";
import { ItemFilter } from "@/types/mutual-fund/items";

const DEFAULT_FILTER: ItemFilter = {
  search: "",

  categoryId: undefined,

  page: 1,
  limit: 20,

  sortBy: "name",
  sortOrder: "asc",
};

export function useItemFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER);

  const pagination = useCrudPagination(crud.filters, crud.setFilters, {
    shouldResetPage: (previous, next) =>
      previous.search !== next.search ||
      previous.categoryId !== next.categoryId,
  });

  return {
    ...crud,
    ...pagination,
  };
}
