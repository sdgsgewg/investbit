import { fetchCategoriesWithItems } from "@/lib/api/mutual-fund/records";
import { queryConfig } from "@/lib/react-query/queryConfig";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCategoriesWithItems() {
  const query = useQuery({
    queryKey: queryKeys.categoriesWithItems(),
    queryFn: fetchCategoriesWithItems,
    ...queryConfig,
  });

  return {
    categoriesWithItems: query.data ?? [],
    ...query,
  };
}
