import { RecordsInput } from "@/lib/validations/mutual-fund/records.schema";
import { useSaveRecords } from "./useSaveRecords";

interface SubmitOptions {
  payload: RecordsInput;
  onSuccess?: () => void;
}

export function useRecordSubmit(selectedDate?: string) {
  const saveMutation = useSaveRecords(selectedDate);

  const isSubmitting = saveMutation.isPending;

  const submit = ({ payload, onSuccess }: SubmitOptions) => {
    if (payload.length === 0) return;

    saveMutation.mutate(payload, { onSuccess });
  };

  return {
    isSubmitting,
    submit,
  };
}
