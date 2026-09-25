import { useState, useMemo } from "react";
import { useNumberFormatter } from "@/hooks/useNumberFormatter";
import {
  FieldInput,
  RecordFilter,
  RecordInputByItemId,
  RecordListItem,
} from "@/types/mutual-fund/records";
import { RecordsInput } from "@/lib/validations/mutual-fund/records.schema";

export function useRecordForm(
  recordsData: RecordListItem[] = [],
  filters: RecordFilter,
) {
  const { formatDecimal, parseNumber } = useNumberFormatter();

  // Stores only user-edited values so server data can remain the source of truth.
  const [localInputs, setLocalInputs] = useState<RecordInputByItemId>({});

  // Reset local inputs when the selected date or category changes.
  // State is updated during render to avoid showing stale inputs for the new filter.
  const currentFilterKey = `${filters.startDate ?? ""}_${filters.categoryId ?? ""}`;
  const [prevFilterKey, setPrevFilterKey] = useState(currentFilterKey);

  if (prevFilterKey !== currentFilterKey) {
    setPrevFilterKey(currentFilterKey);
    setLocalInputs({});
  }

  // Convert server records into the string format expected by the input fields.
  const mappedInputs = useMemo(() => {
    if (!recordsData || recordsData.length === 0) return {};

    const result: RecordInputByItemId = {};
    recordsData.forEach((record) => {
      result[record.item.id] = {
        nav_1d: record.nav1d !== null ? formatDecimal(record.nav1d, 4) : "",
      };
    });

    return result;
  }, [recordsData, formatDecimal]);

  // Merge server values with local edits.
  // Local values take precedence when the user has modified an input.
  const inputs = useMemo(() => {
    const result: RecordInputByItemId = { ...mappedInputs };

    Object.entries(localInputs).forEach(([itemId, values]) => {
      result[itemId] = {
        ...result[itemId],
        ...values,
      };
    });

    return result;
  }, [mappedInputs, localInputs]);

  // Enable Save only when there is at least one value and at least one change.
  const canSave = useMemo(() => {
    const entries = Object.entries(inputs);
    if (entries.length === 0) return false;

    let hasAnyValue = false;
    let hasChanges = false;

    for (const [itemId, val] of entries) {
      const original = mappedInputs[itemId];

      const currentNav1d = val.nav_1d ?? "";
      const originalNav1d = original?.nav_1d ?? "";

      if (currentNav1d !== "") {
        hasAnyValue = true;
      }

      if (currentNav1d !== originalNav1d) {
        hasChanges = true;
      }

      if (hasAnyValue && hasChanges) return true;
    }

    return false;
  }, [inputs, mappedInputs]);

  // Update a single field while preserving the other field's current value.
  const handleInputChange = (
    itemId: string,
    field: FieldInput,
    value: string,
  ) => {
    setLocalInputs((prev) => ({
      ...prev,
      [itemId]: {
        // nav_1d: prev[itemId]?.nav_1d ?? mappedInputs[itemId]?.nav_1d ?? "",
        [field]: value,
      },
    }));
  };

  // Convert input strings into API-compatible values and exclude empty records.
  const buildPayload = (selectedDate?: string): RecordsInput => {
    if (!selectedDate) return [];

    return Object.entries(inputs)
      .map(([itemId, values]) => {
        const parsedNav1d = parseNumber(values.nav_1d);

        return {
          item_id: itemId,
          date: selectedDate,
          nav_1d: parsedNav1d,
        };
      })
      .filter((doc) => doc.nav_1d !== null);
  };

  // Clear all local edits and restore the form to the current server values.
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
