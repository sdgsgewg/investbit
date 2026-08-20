import { fetchGroupedItems } from "@/lib/api/mutual-fund/items";
import { itemKeys } from "@/lib/react-query/keys/itemKeys";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { GroupedItemQuery } from "@/types/mutual-fund/items";
import { useQuery } from "@tanstack/react-query";

export function useGroupedItems(
  params?: GroupedItemQuery,
  enabled: boolean = true,
) {
  const {
    data = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: itemKeys.groupedList(params),
    queryFn: () => fetchGroupedItems(params),
    enabled,
    ...queryConfig,
  });

  return {
    groupedItems: data,
    isLoading,
    isRefetching,
    error,
    refetch,
  };
}
