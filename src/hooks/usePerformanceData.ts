import { useState } from "react";
import axios from "axios";
import { FilterPerformance } from "@/types/reksadana/recap/performance/FilterPerformance";
import { CategoryStats } from "@/types/reksadana/recap/performance/CategoryStats";
import { DataType } from "../types/reksadana/recap/performance/DataType";
import { TimeFrameType } from "@/types/reksadana/recap/performance/TimeFrameType";
import { useQuery } from "@tanstack/react-query";
import { PerformanceResponse } from "@/types/reksadana/recap/performance/PerformanceResponse";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchPerformance } from "@/lib/api/reksadana";
import { queryConfig } from "@/lib/react-query/queryConfig";

interface UsePerformanceDataProps {
  timeFrame: TimeFrameType;
  initialForm?: FilterPerformance;
}

interface UsePerformanceDataReturn {
  data: DataType;
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
}

export const usePerformanceData = ({
  timeFrame,
  initialForm = { category_id: "" },
}: UsePerformanceDataProps): UsePerformanceDataReturn => {
  const [form, setForm] = useState<FilterPerformance>(initialForm);

  const { data, isLoading, isFetching } = useQuery<PerformanceResponse>({
    queryKey: queryKeys.performance({
      timeFrame,
      categoryId: form.category_id,
    }),
    queryFn: () =>
      fetchPerformance({
        timeFrame,
        categoryId: form.category_id,
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

  return {
    data: data?.data ?? [],
    timePeriods: data?.timePeriods ?? [],
    categoryStats: data?.categoryStats ?? {},
    loading: isLoading,
    fetching: isFetching,
    form,
    setForm,
    getCellColor,
  };
};
