import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchItems } from "@/lib/api/mutual-fund/items";
import { itemKeys } from "@/lib/react-query/keys/itemKeys";
import { ItemQuery } from "@/types/mutual-fund/items";

export function useItems(params?: ItemQuery, enabled: boolean = true) {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: itemKeys.list(params),
    queryFn: () => fetchItems(params),
    enabled,
    ...queryConfig,
  });

  return {
    items: data?.items ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    page: data?.page ?? 1,
    limit: data?.limit ?? 20,

    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
}
