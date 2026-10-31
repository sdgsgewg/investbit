import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchPerformanceAnalytics } from "@/lib/api/mutual-fund/performance/analytics";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import {
  CategoryStats,
  PerformanceAnalyticsResponse,
  PerformanceData,
  PerformanceFilter,
} from "@/types/mutual-fund/performance";

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
  draftStartPeriod: string;
  draftEndPeriod: string;
  appliedStartPeriod: string;
  appliedEndPeriod: string;
  hasDraftChanges: boolean;
  canApply: boolean;
  loadMorePeriods: () => void;
  resetToLatestPeriods: () => void;
  setDraftStartPeriod: (period: string) => void;
  setDraftEndPeriod: (period: string) => void;
  applyFilter: () => void;
  loadError: unknown | null;
  retryLoad: () => void;
}

const DEFAULT_PERIOD_LIMIT = 10;

export const usePerformanceAnalytics = ({
  timeFrame,
  categoryId,
}: PerformanceFilter): UsePerformanceAnalyticsReturn => {
  const filterKey = `${timeFrame}:${categoryId ?? ""}`;
  const [selection, setSelection] = useState({
    filterKey,
    periodLimit: DEFAULT_PERIOD_LIMIT,
    draftStartPeriod: "",
    draftEndPeriod: "",
    appliedStartPeriod: "",
    appliedEndPeriod: "",
  });

  // Derive the reset values during render when filters change. This avoids an
  // effect that first renders stale selections and then synchronously resets them.
  const currentSelection =
    selection.filterKey === filterKey
      ? selection
      : {
          filterKey,
          periodLimit: DEFAULT_PERIOD_LIMIT,
          draftStartPeriod: "",
          draftEndPeriod: "",
          appliedStartPeriod: "",
          appliedEndPeriod: "",
        };
        
  const {
    periodLimit,
    draftStartPeriod,
    draftEndPeriod,
    appliedStartPeriod,
    appliedEndPeriod,
  } = currentSelection;

  const updateSelection = (
    update: (current: typeof currentSelection) => typeof currentSelection,
  ) => {
    setSelection((previous) => {
      const current =
        previous.filterKey === filterKey
          ? previous
          : {
              filterKey,
              periodLimit: DEFAULT_PERIOD_LIMIT,
              draftStartPeriod: "",
              draftEndPeriod: "",
              appliedStartPeriod: "",
              appliedEndPeriod: "",
            };
      return update(current);
    });
  };

  const setDraftStartPeriod = (period: string) =>
    updateSelection((current) => ({ ...current, draftStartPeriod: period }));
  const setDraftEndPeriod = (period: string) =>
    updateSelection((current) => ({ ...current, draftEndPeriod: period }));

  const isRangeMode = Boolean(appliedStartPeriod || appliedEndPeriod);

  const hasDraftChanges =
    draftStartPeriod !== appliedStartPeriod ||
    draftEndPeriod !== appliedEndPeriod;

  const canApply =
    hasDraftChanges && Boolean(draftStartPeriod || draftEndPeriod);

  const { data, isLoading, isFetching, isRefetching, error, refetch } =
    useQuery<PerformanceAnalyticsResponse>({
      queryKey: queryKeys.performanceAnalytics({
        timeFrame,
        categoryId: categoryId || undefined,
        periodLimit: isRangeMode ? undefined : periodLimit,
        startPeriod: isRangeMode ? appliedStartPeriod || undefined : undefined,
        endPeriod: isRangeMode ? appliedEndPeriod || undefined : undefined,
      }),
      queryFn: () =>
        fetchPerformanceAnalytics({
          timeFrame,
          categoryId: categoryId || undefined,
          periodLimit: isRangeMode ? undefined : periodLimit,
          startPeriod: isRangeMode
            ? appliedStartPeriod || undefined
            : undefined,
          endPeriod: isRangeMode ? appliedEndPeriod || undefined : undefined,
        }),
      placeholderData: (prev) => prev ?? undefined,
      ...queryConfig,
    });

  const applyFilter = () => {
    if (!canApply) return;
    updateSelection((current) => ({
      ...current,
      appliedStartPeriod: current.draftStartPeriod,
      appliedEndPeriod: current.draftEndPeriod,
    }));
  };

  const resetToLatestPeriods = () => {
    updateSelection((current) => ({
      ...current,
      periodLimit: DEFAULT_PERIOD_LIMIT,
      draftStartPeriod: "",
      draftEndPeriod: "",
      appliedStartPeriod: "",
      appliedEndPeriod: "",
    }));
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
    draftStartPeriod,
    draftEndPeriod,
    appliedStartPeriod,
    appliedEndPeriod,
    hasDraftChanges,
    canApply,
    loadMorePeriods: () => {
      if (!isFetching && !isRangeMode) {
        updateSelection((current) => ({
          ...current,
          periodLimit: current.periodLimit + 10,
        }));
      }
    },
    resetToLatestPeriods,
    setDraftStartPeriod,
    setDraftEndPeriod,
    applyFilter,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
};
