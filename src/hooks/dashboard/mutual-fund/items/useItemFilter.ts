import { useFilters } from "@/hooks/filter";
import { usePagination } from "@/hooks/pagination";
import { hasFilterChanged, parseSearchParams } from "@/lib/utils/crud";
import { itemsQuerySchema } from "@/lib/validations/mutual-fund/items.schema";
import { ItemFilter } from "@/types/mutual-fund/items";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const DEFAULT_FILTER: ItemFilter = {
  search: "",

  categoryId: undefined,

  page: 1,
  limit: 20,

  sortBy: "name",
  sortOrder: "asc",
};

export function useItemFilter() {
  const searchParams = useSearchParams();

  const initialFilter = useMemo(
    () => parseSearchParams(searchParams, itemsQuerySchema),
    [searchParams],
  );

  const crud = useFilters(DEFAULT_FILTER, {
    initialFilter,
    omitDefaultValuesFromUrl: true,
    shouldResetPage: hasFilterChanged(["search", "sortBy", "sortOrder"]),
  });

  const pagination = usePagination(crud.filters, crud.updateFiltersPartial);

  return {
    defaultFilters: DEFAULT_FILTER,
    ...crud,
    ...pagination,
  };
}
