import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchCategories } from "@/lib/api/mutual-fund/categories";
import { CategoryQuery } from "@/types/mutual-fund/categories";
import { categoryKeys } from "@/lib/react-query/keys/categoryKeys";

export function useCategories(params?: CategoryQuery, enabled: boolean = true) {
  const {
    data = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: categoryKeys.list(params),
    queryFn: () => fetchCategories(params),
    enabled,
    ...queryConfig,
  });

  return {
    categories: data,
    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
}
