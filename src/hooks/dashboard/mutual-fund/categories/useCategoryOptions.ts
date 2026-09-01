import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { fetchCategoryOptions } from "@/lib/api/mutual-fund/categories";
import { categoryKeys } from "@/lib/react-query/keys";

export function useCategoryOptions() {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: categoryKeys.options(),
    queryFn: fetchCategoryOptions,
    ...queryConfig,
  });

  return {
    categoryOptions: data ?? [],

    loading: isLoading,
    retrying: isRefetching,

    loadError: error ?? null,
    retryLoad: refetch,
  };
}
