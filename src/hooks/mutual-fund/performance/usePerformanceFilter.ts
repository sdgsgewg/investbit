import { TimeFrame } from "@/enums/TimeFrame";
import { useGenericFilters } from "@/hooks/filter/useGenericFilters";
import { parseSearchParams } from "@/lib/utils/crud";
import { performanceQuerySchema } from "@/lib/validations/mutual-fund/performance.schema";
import { PerformanceFilter } from "@/types/mutual-fund/performance";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const getDefaultFilter = (): PerformanceFilter => {
  return {
    timeFrame: TimeFrame.WEEKLY,
    categoryId: undefined,
  };
};

export function usePerformanceFilter() {
  const searchParams = useSearchParams();

  const defaultFilter = useMemo(() => getDefaultFilter(), []);

  const initialFilter = useMemo(() => {
    const parsed = parseSearchParams(searchParams, performanceQuerySchema);

    return {
      ...defaultFilter,
      ...parsed,
    };
  }, [searchParams, defaultFilter]);

  const crud = useGenericFilters(defaultFilter, {
    initialFilter,
    omitDefaultValuesFromUrl: true,
  });

  return {
    defaultFilters: defaultFilter,
    ...crud,
  };
}
