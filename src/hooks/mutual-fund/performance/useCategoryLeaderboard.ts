import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchCategoryLeaderboard } from "@/lib/api/mutual-fund/leaderboard";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import {
  CategoryLeaderboardResponse,
  RankedPerformanceCategory,
} from "@/types/mutual-fund/performance";
import { TimeFrame } from "@/enums/TimeFrame";

interface UseCategoryLeaderboardProps {
  timeFrame: TimeFrame;
  categoryId?: string;
}

export interface UseCategoryLeaderboardReturn {
  rankedCategories: RankedPerformanceCategory[];
  latestPeriod: string;
  loading: boolean;
  fetching: boolean;
  retrying: boolean;
  loadError: unknown | null;
  retryLoad: () => void;
}

export const useCategoryLeaderboard = ({
  timeFrame,
  categoryId,
}: UseCategoryLeaderboardProps): UseCategoryLeaderboardReturn => {
  const { data, isLoading, isFetching, isRefetching, error, refetch } =
    useQuery<CategoryLeaderboardResponse>({
      queryKey: queryKeys.categoryLeaderboard({
        timeFrame,
        categoryId: categoryId || undefined,
      }),
      queryFn: () =>
        fetchCategoryLeaderboard({
          timeFrame,
          categoryId: categoryId || undefined,
        }),
      placeholderData: (prev) => prev ?? undefined,
      ...queryConfig,
    });

  return {
    rankedCategories: data?.rankedCategories ?? [],
    latestPeriod: data?.latestPeriod ?? "",
    loading: isLoading,
    fetching: isFetching,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
};
