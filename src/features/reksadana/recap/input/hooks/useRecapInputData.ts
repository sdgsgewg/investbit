import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { YieldInputByItemId } from "@/features/reksadana/recap/input/types/YieldInputByItemId";
import { RecordData } from "@/types/reksadana/records/RecordData";
import { queryKeys } from "@/lib/react-query/queryKeys";
import {
  fetchCategoriesWithItems,
  fetchRecords,
  saveRecords,
} from "@/lib/api/reksadana";
import { queryConfig } from "@/lib/react-query/queryConfig";
import { RecordsInput } from "@/lib/validations/reksadana/records.schema";
import { useTranslations } from "next-intl";
import { CategoryWithItems } from "@/features/reksadana/recap/input/types/CategoryWithItems";
import { useNumberFormatter } from "@/hooks/useNumberFormatter";

interface UseRecapInputDataReturn {
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
  canApplyDateChange: boolean;
  saving: boolean;
  canSave: boolean;
}

export const useRecapInputData = (): UseRecapInputDataReturn => {
  const tReksdanaRecapInput = useTranslations("reksadana.recap.input");

  const queryClient = useQueryClient();
  const { parseNumber } = useNumberFormatter();

  const [draftDate, setDraftDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedDate, setSelectedDate] = useState(draftDate);

  const [localInputs, setLocalInputs] = useState<YieldInputByItemId>({});

  // 1. Grouped by category items
  const { data: categoriesWithItems = [], isLoading: isLoadingItems } =
    useQuery({
      queryKey: queryKeys.categoriesWithItems(),
      queryFn: fetchCategoriesWithItems,
      ...queryConfig,
    });

  // 2. Records
  const {
    data: recordsData,
    isLoading: isLoadingRecords,
    isFetching,
  } = useQuery<RecordData[]>({
    queryKey: queryKeys.records(selectedDate),
    queryFn: () => fetchRecords(selectedDate),
    enabled: !!selectedDate,
    ...queryConfig,
  });

  // 3. Sync records → inputs
  const mappedInputs = useMemo(() => {
    if (!recordsData) return {};

    const result: YieldInputByItemId = {};

    recordsData.forEach((record) => {
      result[record.item_id] = {
        yield_1d: record.yield_1d !== null ? String(record.yield_1d) : "",
        yield_ytd: record.yield_ytd !== null ? String(record.yield_ytd) : "",
      };
    });

    return result;
  }, [recordsData]);

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

  const canApplyDateChange = useMemo(() => {
    if (draftDate !== selectedDate) return true;
    return false;
  }, [draftDate, selectedDate]);

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
        alert(tReksdanaRecapInput("form.errors.empty"));
        throw new Error("EMPTY");
      }

      await saveRecords(payload);
    },
    onSuccess: () => {
      alert(`${tReksdanaRecapInput("form.success")} ${selectedDate}`);
      queryClient.invalidateQueries({
        queryKey: queryKeys.records(selectedDate),
      });
    },
    onError: (error) => {
      alert(tReksdanaRecapInput("form.errors.failed"));
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
      queryKey: queryKeys.records(formattedNextDate),
      queryFn: () => fetchRecords(formattedNextDate),
    });

    // prefetch previous date (misalnya kemarin)
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    const formattedPrevDate = prevDate.toISOString().split("T")[0];
    queryClient.prefetchQuery({
      queryKey: queryKeys.records(formattedPrevDate),
      queryFn: () => fetchRecords(formattedPrevDate),
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
    canApplyDateChange,
    saving: mutation.isPending,
    canSave,
  };
};
