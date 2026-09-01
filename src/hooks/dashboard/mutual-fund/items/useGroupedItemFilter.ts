import { useFilters } from "@/hooks/filter";
import { GroupedItemFilter } from "@/types/mutual-fund/items";

const DEFAULT_FILTER: GroupedItemFilter = {
  search: "",

  categoryId: undefined,

  sortBy: "name",
  sortOrder: "asc",
};

export default function useGroupedItemFilter() {
  const crud = useFilters(DEFAULT_FILTER);

  return {
    ...crud,
  };
}
