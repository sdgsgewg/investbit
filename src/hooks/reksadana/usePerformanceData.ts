import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchPerformance } from "@/lib/api/reksadana";
import { queryConfig } from "@/lib/react-query/queryConfig";
import { TimeFrameType } from "@/types/reksadana/performance/TimeFrameType";
import { FilterPerformance } from "@/types/reksadana/performance/FilterPerformance";
import { PerformanceData } from "@/types/reksadana/performance/DataType";
import { CategoryStats } from "@/types/reksadana/performance/CategoryStats";
import { PerformanceResponse } from "@/types/reksadana/performance/PerformanceResponse";

interface UsePerformanceDataProps {
  timeFrame: TimeFrameType;
  initialForm?: FilterPerformance;
}

interface UsePerformanceDataReturn {
  data: PerformanceData;
  timePeriods: string[];
  availablePeriods: string[];
  loading: boolean;
  fetching: boolean;
  retrying: boolean;
  form: FilterPerformance;
  setForm: React.Dispatch<React.SetStateAction<FilterPerformance>>;
  categoryStats: CategoryStats;
  getCellColor: (
    val: number | undefined,
    catName: string,
    timeKey: string,
  ) => string;
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

export const usePerformanceData = ({
  timeFrame,
  initialForm = { category_id: "" },
}: UsePerformanceDataProps): UsePerformanceDataReturn => {
  const [form, setRawForm] = useState<FilterPerformance>(initialForm);
  const [periodLimit, setPeriodLimit] = useState(DEFAULT_PERIOD_LIMIT);
  const [selectedStartPeriod, setSelectedStartPeriod] = useState("");
  const [selectedEndPeriod, setSelectedEndPeriod] = useState("");

  const isRangeMode = Boolean(selectedStartPeriod || selectedEndPeriod);

  const { data, isLoading, isFetching, isRefetching, error, refetch } =
    useQuery<PerformanceResponse>({
      queryKey: queryKeys.performance({
        timeFrame,
        categoryId: form.category_id,
        periodLimit: isRangeMode ? undefined : periodLimit,
        startPeriod: isRangeMode ? selectedStartPeriod || undefined : undefined,
        endPeriod: isRangeMode ? selectedEndPeriod || undefined : undefined,
      }),
      queryFn: () =>
        fetchPerformance({
          timeFrame,
          categoryId: form.category_id,
          periodLimit: isRangeMode ? undefined : periodLimit,
          startPeriod: isRangeMode
            ? selectedStartPeriod || undefined
            : undefined,
          endPeriod: isRangeMode ? selectedEndPeriod || undefined : undefined,
        }),
      placeholderData: (prev) => prev ?? undefined,
      ...queryConfig,
    });

  const getCellColor = (
    val: number | undefined,
    catName: string,
    timeKey: string,
  ) => {
    if (val === undefined || isNaN(val)) return "";

    const stat = data?.categoryStats?.[catName]?.[timeKey];
    if (!stat || stat.min === stat.max) return "";

    const normalized = (val - stat.min) / (stat.max - stat.min);

    if (normalized < 0.5) {
      const intensity = 1 - normalized / 0.5;
      return `rgba(239, 68, 68, ${Math.max(intensity * 0.8, 0.05)})`;
    } else {
      const intensity = (normalized - 0.5) / 0.5;
      return `rgba(34, 197, 94, ${Math.max(intensity * 0.8, 0.05)})`;
    }
  };

  const resetToLatestPeriods = () => {
    setPeriodLimit(DEFAULT_PERIOD_LIMIT);
    setSelectedStartPeriod("");
    setSelectedEndPeriod("");
  };

  const setForm: React.Dispatch<React.SetStateAction<FilterPerformance>> = (
    value,
  ) => {
    resetToLatestPeriods();
    setRawForm(value);
  };

  return {
    data: data?.data ?? [],
    timePeriods: data?.timePeriods ?? [],
    availablePeriods: data?.availablePeriods ?? [],
    categoryStats: data?.categoryStats ?? {},
    loading: isLoading,
    fetching: isFetching,
    retrying: isRefetching,
    form,
    setForm,
    getCellColor,
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
