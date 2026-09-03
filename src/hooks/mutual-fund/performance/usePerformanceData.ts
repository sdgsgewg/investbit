import { useState } from "react";
import {
  usePerformanceAnalytics,
  UsePerformanceAnalyticsReturn,
} from "./usePerformanceAnalytics";
import { PerformanceFilter } from "@/types/mutual-fund/performance";
import { TimeFrame } from "@/enums/TimeFrame";

interface UsePerformanceDataProps {
  timeFrame: TimeFrame;
  initialForm?: PerformanceFilter;
}

export interface UsePerformanceDataReturn extends UsePerformanceAnalyticsReturn {
  form: PerformanceFilter;
  setForm: React.Dispatch<React.SetStateAction<PerformanceFilter>>;
}

/**
 * Backward compatibility hook combining filter state with analytics data.
 */
export const usePerformanceData = ({
  timeFrame,
  initialForm = { categoryId: "" },
}: UsePerformanceDataProps): UsePerformanceDataReturn => {
  const [form, setForm] = useState<PerformanceFilter>(initialForm);

  const analytics = usePerformanceAnalytics({
    timeFrame,
    categoryId: form.categoryId,
  });

  return {
    ...analytics,
    form,
    setForm,
  };
};
