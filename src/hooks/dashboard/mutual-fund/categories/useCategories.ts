import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/queryConfig";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchCategories } from "@/lib/api/reksadana/categories";

export function useCategories() {
  const {
    data = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.categories(),
    queryFn: fetchCategories,
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
