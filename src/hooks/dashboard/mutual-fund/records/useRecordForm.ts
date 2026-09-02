import { useState, useMemo } from "react";
import { useNumberFormatter } from "@/hooks/useNumberFormatter";
import { YieldInputByItemId } from "@/types/mutual-fund/records/YieldInputByItemId";
import { RecordFilter, RecordListItem } from "@/types/mutual-fund/records";
import { RecordsInput } from "@/lib/validations/mutual-fund/records.schema";

export function useRecordForm(
  recordsData: RecordListItem[] = [],
  filters: RecordFilter,
) {
  const { formatDecimal, parseNumber } = useNumberFormatter();
  const [localInputs, setLocalInputs] = useState<YieldInputByItemId>({});

  // Reset local inputs saat tanggal atau kategori berganti (adjusting state during render)
  const currentFilterKey = `${filters.startDate ?? ""}_${filters.categoryId ?? ""}`;
  const [prevFilterKey, setPrevFilterKey] = useState(currentFilterKey);

  if (prevFilterKey !== currentFilterKey) {
    setPrevFilterKey(currentFilterKey);
    setLocalInputs({});
  }

  // Sync records dari server ke format string input
  const mappedInputs = useMemo(() => {
    if (!recordsData || recordsData.length === 0) return {};

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

  // Merge mapped server data dengan input user lokal
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

  // Validasi tombol simpan aktif
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

      if (current1d !== "" || currentYtd !== "") {
        hasAnyValue = true;
      }

      if (current1d !== original1d || currentYtd !== originalYtd) {
        hasChanges = true;
      }

      if (hasAnyValue && hasChanges) return true;
    }

    return false;
  }, [inputs, mappedInputs]);

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

  const buildPayload = (selectedDate?: string): RecordsInput => {
    if (!selectedDate) return [];

    return Object.entries(inputs)
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
  };

  const resetForm = () => {
    setLocalInputs({});
  };

  return {
    inputs,
    canSave,
    handleInputChange,
    buildPayload,
    resetForm,
  };
}
