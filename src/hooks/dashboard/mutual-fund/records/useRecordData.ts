import { useState, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { fetchRecords, saveRecords } from "@/lib/api/mutual-fund/records";
import { RecordsInput } from "@/lib/validations/reksadana/records.schema";
import { useTranslations } from "next-intl";
import { useNumberFormatter } from "@/hooks/useNumberFormatter";
import { getLastWorkingDay, safeFormatDate } from "@/lib/utils/date";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { CategoryWithItems } from "@/types/mutual-fund/records/CategoryWithItems";
import { YieldInputByItemId } from "@/types/mutual-fund/records/YieldInputByItemId";
import { useRecords } from "./useRecords";
import { useCategoriesWithItems } from "../items";

interface UseRecordDataReturn {
  categoriesWithItems: CategoryWithItems[];
  inputs: YieldInputByItemId;

  draftDate: string;
  selectedDate: string;

  setDraftDate: (date: string) => void;
  setSelectedDate: (date: string) => void;

  handleInputChange: (
    itemId: string,
    field: "yield_1d" | "yield_ytd",
    value: string,
  ) => void;

  handleSave: () => void;

  loading: boolean;
  fetching: boolean;
  saving: boolean;
  canSave: boolean;
  loadError: unknown | null;
  retryLoad: () => void;
}

export const useRecordData = (): UseRecordDataReturn => {
  const tRecords = useTranslations("dashboard.mutualFund.records");
  const tCommon = useTranslations("common");

  const queryClient = useQueryClient();
  const { parseNumber } = useNumberFormatter();

  const initialDate = getLastWorkingDay();

  const [draftDate, setDraftDate] = useState(
    safeFormatDate(initialDate, "yyyy-MM-dd"),
  );

  const [selectedDate, setSelectedDate] = useState(
    safeFormatDate(initialDate, "yyyy-MM-dd"),
  );

  const [localInputs, setLocalInputs] = useState<YieldInputByItemId>({});

  // 1. Grouped by category items
  const {
    categoriesWithItems,
    isLoading: isLoadingItems,
    error: itemsError,
    refetch: refetchItems,
  } = useCategoriesWithItems();

  // 2. Records
  const {
    records: recordsData,
    isLoading: isLoadingRecords,
    isFetching,
    error: recordsError,
    refetch: refetchRecords,
  } = useRecords({
    startDate: selectedDate,
    endDate: selectedDate,
  });

  // 3. Sync records → inputs
  const { formatDecimal } = useNumberFormatter();

  const mappedInputs = useMemo(() => {
    if (!recordsData) return {};

    const result: YieldInputByItemId = {};

    recordsData.forEach((record) => {
      result[record.item.id] = {
        yield_1d: record.yield1d !== null ? formatDecimal(record.yield1d) : "",
        yield_ytd:
          record.yieldYtd !== null ? formatDecimal(record.yieldYtd) : "",
      };
    });

    return result;
  }, [recordsData, formatDecimal]);

  const inputs = useMemo(() => {
    const result: YieldInputByItemId = { ...mappedInputs };

    Object.entries(localInputs).forEach(([itemId, values]) => {
      result[itemId] = {
        ...result[itemId],
        ...values,
      };
    });

    return result;
  }, [mappedInputs, localInputs]);

  const canSave = useMemo(() => {
    const entries = Object.entries(inputs);

    if (entries.length === 0) return false;

    let hasAnyValue = false;
    let hasChanges = false;

    for (const [itemId, val] of entries) {
      const original = mappedInputs[itemId];

      const current1d = val.yield_1d ?? "";
      const currentYtd = val.yield_ytd ?? "";

      const original1d = original?.yield_1d ?? "";
      const originalYtd = original?.yield_ytd ?? "";

      // cek ada isi
      if (current1d !== "" || currentYtd !== "") {
        hasAnyValue = true;
      }

      // cek perubahan
      if (current1d !== original1d || currentYtd !== originalYtd) {
        hasChanges = true;
      }

      if (hasAnyValue && hasChanges) return true;
    }

    return false;
  }, [inputs, mappedInputs]);

  // 4. Mutation
  const mutation = useMutation({
    mutationFn: async () => {
      const payload: RecordsInput = Object.entries(inputs)
        .map(([itemId, values]) => {
          const parsed1d = parseNumber(values.yield_1d);
          const parsedYtd = parseNumber(values.yield_ytd);

          return {
            item_id: itemId,
            date: selectedDate,
            yield_1d: parsed1d,
            yield_ytd: parsedYtd,
          };
        })
        .filter((doc) => doc.yield_1d !== null || doc.yield_ytd !== null);

      if (payload.length === 0) {
        alert(tRecords("form.errors.empty"));
        throw new Error("EMPTY");
      }

      await saveRecords(payload);
    },
    onSuccess: () => {
      alert(`${tRecords("form.success")} ${selectedDate}`);
      queryClient.invalidateQueries({
        queryKey: queryKeys.records({
          startDate: selectedDate,
          endDate: selectedDate,
        }),
      });
    },
    onError: (error) => {
      console.error("Error: ", JSON.stringify(error, null, 2));

      alert(
        isLikelyConnectionError(error)
          ? tCommon("feedback.connectionIssue.saveFailed")
          : tRecords("form.errors.failed"),
      );
    },
  });

  // handlers
  const handleInputChange = (
    itemId: string,
    field: "yield_1d" | "yield_ytd",
    value: string,
  ) => {
    setLocalInputs((prev) => ({
      ...prev,
      [itemId]: {
        yield_1d:
          prev[itemId]?.yield_1d ?? mappedInputs[itemId]?.yield_1d ?? "",
        yield_ytd:
          prev[itemId]?.yield_ytd ?? mappedInputs[itemId]?.yield_ytd ?? "",
        [field]: value,
      },
    }));
  };

  const handlePrefetchAdjacentDates = (date: string) => {
    // prefetch next date (misalnya besok)
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    const formattedNextDate = nextDate.toISOString().split("T")[0];
    queryClient.prefetchQuery({
      queryKey: queryKeys.records({
        startDate: formattedNextDate,
        endDate: formattedNextDate,
      }),
      queryFn: () =>
        fetchRecords({
          startDate: formattedNextDate,
          endDate: formattedNextDate,
        }),
    });

    // prefetch previous date (misalnya kemarin)
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    const formattedPrevDate = prevDate.toISOString().split("T")[0];
    queryClient.prefetchQuery({
      queryKey: queryKeys.records({
        startDate: formattedPrevDate,
        endDate: formattedPrevDate,
      }),
      queryFn: () =>
        fetchRecords({
          startDate: formattedPrevDate,
          endDate: formattedPrevDate,
        }),
    });
  };

  const handleSelectDate = (date: string) => {
    if (date !== selectedDate) {
      setLocalInputs({});
    }
    setSelectedDate(date);
    handlePrefetchAdjacentDates(date);
  };

  const handleSave = () => {
    mutation.mutate();
  };

  return {
    categoriesWithItems,
    inputs,

    draftDate,
    selectedDate,

    setDraftDate,
    setSelectedDate: handleSelectDate,

    handleInputChange,
    handleSave,

    loading: isLoadingItems || isLoadingRecords,
    fetching: isFetching,
    saving: mutation.isPending,
    canSave,
    loadError: itemsError ?? recordsError ?? null,
    retryLoad: () => {
      void refetchItems();
      void refetchRecords();
    },
  };
};
