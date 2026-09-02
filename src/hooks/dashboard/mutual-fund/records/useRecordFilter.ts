import { useGenericFilters } from "@/hooks/filter/useGenericFilters";
import { parseSearchParams } from "@/lib/utils/crud";
import { recordsQuerySchema } from "@/lib/validations/mutual-fund/records.schema";
import { RecordFilter } from "@/types/mutual-fund/records";
import { getLastWorkingDay, safeFormatDate } from "@/lib/utils/date";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const getDefaultFilter = (): RecordFilter => {
  const defaultDate = safeFormatDate(getLastWorkingDay(), "yyyy-MM-dd");
  return {
    startDate: defaultDate,
    endDate: defaultDate,
    categoryId: undefined,
  };
};

export function useRecordFilter() {
  const searchParams = useSearchParams();
  const defaultFilter = useMemo(() => getDefaultFilter(), []);

  const initialFilter = useMemo(() => {
    const parsed = parseSearchParams(searchParams, recordsQuerySchema);
    return {
      ...defaultFilter,
      ...parsed,
      startDate: parsed.startDate || defaultFilter.startDate,
      endDate: parsed.endDate || defaultFilter.endDate,
    };
  }, [searchParams, defaultFilter]);

  const crud = useGenericFilters(defaultFilter, {
    initialFilter,
    omitDefaultValuesFromUrl: true,
  });

  const handleDateChange = (date: string) => {
    crud.updateFiltersPartial({
      startDate: date,
      endDate: date,
    });
  };

  const handleCategoryChange = (categoryId?: string) => {
    crud.updateFilter("categoryId", categoryId || undefined);
  };

  return {
    defaultFilters: defaultFilter,
    ...crud,
    handleDateChange,
    handleCategoryChange,
  };
}
