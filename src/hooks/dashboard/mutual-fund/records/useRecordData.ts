import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchRecords } from "@/lib/api/mutual-fund/records";
import { safeFormatDate } from "@/lib/utils/date";
import { useRecords } from "./useRecords";
import { useGroupedItems } from "../items";
import { RecordFilter } from "@/types/mutual-fund/records";

export const useRecordData = (filters: RecordFilter) => {
  const queryClient = useQueryClient();

  // 1. Grouped by category items
  const {
    groupedItems,
    isLoading: isLoadingGroupedItems,
    error: itemsError,
    refetch: refetchItems,
  } = useGroupedItems({
    categoryId: filters.categoryId,
  });

  // 2. Records for selected date
  const {
    records: recordsData,
    isLoading: isLoadingRecords,
    isFetching,
    error: recordsError,
    refetch: refetchRecords,
  } = useRecords({
    startDate: filters.startDate,
    endDate: filters.endDate,
  });

  // 3. Prefetch adjacent dates (H-1 & H+1)
  useEffect(() => {
    if (!filters.startDate) return;

    const targetDate = new Date(filters.startDate);

    // Next date
    const nextDate = new Date(targetDate);
    nextDate.setDate(nextDate.getDate() + 1);
    const formattedNext = safeFormatDate(nextDate, "yyyy-MM-dd");
    queryClient.prefetchQuery({
      queryKey: queryKeys.records({
        startDate: formattedNext,
        endDate: formattedNext,
      }),
      queryFn: () =>
        fetchRecords({
          startDate: formattedNext,
          endDate: formattedNext,
        }),
    });

    // Prev date
    const prevDate = new Date(targetDate);
    prevDate.setDate(prevDate.getDate() - 1);
    const formattedPrev = safeFormatDate(prevDate, "yyyy-MM-dd");
    queryClient.prefetchQuery({
      queryKey: queryKeys.records({
        startDate: formattedPrev,
        endDate: formattedPrev,
      }),
      queryFn: () =>
        fetchRecords({
          startDate: formattedPrev,
          endDate: formattedPrev,
        }),
    });
  }, [filters.startDate, queryClient]);

  return {
    groupedItems,
    recordsData,
    loading: isLoadingGroupedItems || isLoadingRecords,
    fetching: isFetching,
    loadError: itemsError ?? recordsError ?? null,
    retryLoad: () => {
      void refetchItems();
      void refetchRecords();
    },
  };
};
