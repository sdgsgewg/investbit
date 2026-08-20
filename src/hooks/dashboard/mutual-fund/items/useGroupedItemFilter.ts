import { useCrudFilters } from "@/hooks/crud";
import { GroupedItemFilter } from "@/types/mutual-fund/items";

const DEFAULT_FILTER: GroupedItemFilter = {
  search: "",

  categoryId: undefined,

  sortBy: "name",
  sortOrder: "asc",
};

export default function useGroupedItemFilter() {
  const crud = useCrudFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
