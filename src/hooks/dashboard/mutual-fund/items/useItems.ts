import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/queryConfig";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchItems } from "@/lib/api/reksadana/items";

export function useItems() {
  const {
    data = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.items(),
    queryFn: fetchItems,
    ...queryConfig,
  });

  return {
    items: data,
    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
}
