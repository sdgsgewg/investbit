import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchPerformanceAnalytics } from "@/lib/api/mutual-fund/analytics";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import {
  CategoryStats,
  PerformanceAnalyticsResponse,
  PerformanceData,
} from "@/types/mutual-fund/performance";
import { TimeFrame } from "@/enums/TimeFrame";

interface UsePerformanceAnalyticsProps {
  timeFrame: TimeFrame;
  categoryId?: string;
}

export interface UsePerformanceAnalyticsReturn {
  data: PerformanceData;
  timePeriods: string[];
  availablePeriods: string[];
  categoryStats: CategoryStats;
  loading: boolean;
  fetching: boolean;
  retrying: boolean;
  periodLimit: number;
  hasMoreOlder: boolean;
  hasLoadedOlder: boolean;
  isRangeMode: boolean;
  selectedStartPeriod: string;
  selectedEndPeriod: string;
  loadMorePeriods: () => void;
  resetToLatestPeriods: () => void;
  setStartPeriod: (period: string) => void;
  setEndPeriod: (period: string) => void;
  loadError: unknown | null;
  retryLoad: () => void;
}

const DEFAULT_PERIOD_LIMIT = 10;

export const usePerformanceAnalytics = ({
  timeFrame,
  categoryId,
}: UsePerformanceAnalyticsProps): UsePerformanceAnalyticsReturn => {
  const [periodLimit, setPeriodLimit] = useState(DEFAULT_PERIOD_LIMIT);
  const [selectedStartPeriod, setSelectedStartPeriod] = useState("");
  const [selectedEndPeriod, setSelectedEndPeriod] = useState("");

  const isRangeMode = Boolean(selectedStartPeriod || selectedEndPeriod);

  const { data, isLoading, isFetching, isRefetching, error, refetch } =
    useQuery<PerformanceAnalyticsResponse>({
      queryKey: queryKeys.performanceAnalytics({
        timeFrame,
        categoryId: categoryId || undefined,
        periodLimit: isRangeMode ? undefined : periodLimit,
        startPeriod: isRangeMode ? selectedStartPeriod || undefined : undefined,
        endPeriod: isRangeMode ? selectedEndPeriod || undefined : undefined,
      }),
      queryFn: () =>
        fetchPerformanceAnalytics({
          timeFrame,
          categoryId: categoryId || undefined,
          periodLimit: isRangeMode ? undefined : periodLimit,
          startPeriod: isRangeMode
            ? selectedStartPeriod || undefined
            : undefined,
          endPeriod: isRangeMode ? selectedEndPeriod || undefined : undefined,
        }),
      placeholderData: (prev) => prev ?? undefined,
      ...queryConfig,
    });

  const resetToLatestPeriods = () => {
    setPeriodLimit(DEFAULT_PERIOD_LIMIT);
    setSelectedStartPeriod("");
    setSelectedEndPeriod("");
  };

  return {
    data: data?.data ?? [],
    timePeriods: data?.timePeriods ?? [],
    availablePeriods: data?.availablePeriods ?? [],
    categoryStats: data?.categoryStats ?? {},
    loading: isLoading,
    fetching: isFetching,
    retrying: isRefetching,
    periodLimit,
    hasMoreOlder: data?.hasMoreOlder ?? false,
    hasLoadedOlder: !isRangeMode && periodLimit > DEFAULT_PERIOD_LIMIT,
    isRangeMode,
    selectedStartPeriod,
    selectedEndPeriod,
    loadMorePeriods: () => {
      if (!isFetching && !isRangeMode) {
        setPeriodLimit((prev) => prev + 10);
      }
    },
    resetToLatestPeriods,
    setStartPeriod: (period: string) => {
      setSelectedStartPeriod(period);
    },
    setEndPeriod: (period: string) => {
      setSelectedEndPeriod(period);
    },
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
};
