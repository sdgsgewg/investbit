import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchTopPerformers } from "@/lib/api/mutual-fund/top-performers";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import {
  PerformanceWinner,
  TopPerformersResponse,
} from "@/types/mutual-fund/performance";
import { TimeFrame } from "@/enums/TimeFrame";

interface UseTopPerformersProps {
  timeFrame: TimeFrame;
  categoryId?: string;
}

export interface UseTopPerformersReturn {
  overallBest: PerformanceWinner | null;
  categoryBests: PerformanceWinner[];
  latestPeriod: string;
  loading: boolean;
  fetching: boolean;
  retrying: boolean;
  loadError: unknown | null;
  retryLoad: () => void;
}

export const useTopPerformers = ({
  timeFrame,
  categoryId,
}: UseTopPerformersProps): UseTopPerformersReturn => {
  const { data, isLoading, isFetching, isRefetching, error, refetch } =
    useQuery<TopPerformersResponse>({
      queryKey: queryKeys.topPerformers({
        timeFrame,
        categoryId: categoryId || undefined,
      }),
      queryFn: () =>
        fetchTopPerformers({
          timeFrame,
          categoryId: categoryId || undefined,
        }),
      placeholderData: (prev) => prev ?? undefined,
      ...queryConfig,
    });

  return {
    overallBest: data?.overallBest ?? null,
    categoryBests: data?.categoryBests ?? [],
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
