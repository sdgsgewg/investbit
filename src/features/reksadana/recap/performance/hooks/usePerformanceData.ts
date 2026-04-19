import { useState } from "react";
import { CategoryStats } from "@/features/reksadana/recap/performance/types/CategoryStats";
import { TimeFrameType } from "@/features/reksadana/recap/performance/types/TimeFrameType";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchPerformance } from "@/lib/api/reksadana";
import { queryConfig } from "@/lib/react-query/queryConfig";
import { PerformanceData } from "../types/DataType";
import { FilterPerformance } from "../types/FilterPerformance";
import { PerformanceResponse } from "../types/PerformanceResponse";

interface UsePerformanceDataProps {
  timeFrame: TimeFrameType;
  initialForm?: FilterPerformance;
}

interface UsePerformanceDataReturn {
  data: PerformanceData;
  timePeriods: string[];
  loading: boolean;
  fetching: boolean;
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
  loadMorePeriods: () => void;
  resetToLatestPeriods: () => void;
}

const DEFAULT_PERIOD_LIMIT = 10;

export const usePerformanceData = ({
  timeFrame,
  initialForm = { category_id: "" },
}: UsePerformanceDataProps): UsePerformanceDataReturn => {
  const [form, setRawForm] = useState<FilterPerformance>(initialForm);
  const [periodLimit, setPeriodLimit] = useState(DEFAULT_PERIOD_LIMIT);

  const { data, isLoading, isFetching } = useQuery<PerformanceResponse>({
    queryKey: queryKeys.performance({
      timeFrame,
      categoryId: form.category_id,
      periodLimit,
    }),
    queryFn: () =>
      fetchPerformance({
        timeFrame,
        categoryId: form.category_id,
        periodLimit,
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
    categoryStats: data?.categoryStats ?? {},
    loading: isLoading,
    fetching: isFetching,
    form,
    setForm,
    getCellColor,
    periodLimit,
    hasMoreOlder: data?.hasMoreOlder ?? false,
    hasLoadedOlder: periodLimit > DEFAULT_PERIOD_LIMIT,
    loadMorePeriods: () => {
      if (!isFetching) {
        setPeriodLimit((prev) => prev + 10);
      }
    },
    resetToLatestPeriods,
  };
};
