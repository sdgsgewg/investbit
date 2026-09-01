import { UpsertItemInput } from "@/types/mutual-fund/items";
import { useCreateItem } from "./useCreateItem";
import { useUpdateItem } from "./useUpdateItem";

interface SubmitOptions {
  id?: string;
  payload: UpsertItemInput;

  onSuccess?: () => void;
}

export function useItemSubmit() {
  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const isCreating = createMutation.isPending;
  const isUpdating = updateMutation.isPending;

  const submit = ({ id, payload, onSuccess }: SubmitOptions) => {
    if (id) {
      updateMutation.mutate(
        {
          id,
          data: payload,
        },
        {
          onSuccess,
        },
      );

      return;
    }

    createMutation.mutate(payload, { onSuccess });
  };

  return {
    isSubmitting,
    isCreating,
    isUpdating,
    submit,
  };
}
