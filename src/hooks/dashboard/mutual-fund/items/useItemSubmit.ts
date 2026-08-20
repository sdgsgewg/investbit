import { UpsertItemInput } from "@/types/mutual-fund/items";
import { useTranslations } from "next-intl";
import { useCreateItem } from "./useCreateItem";
import { useUpdateItem } from "./useUpdateItem";

interface SubmitOptions {
  id?: string;
  payload: UpsertItemInput;
  onSuccess?: () => void;
}

export function useItemSubmit() {
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");

  const createMutation = useCreateItem();

  const updateMutation = useUpdateItem();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const isCreating = createMutation.isPending;
  const isUpdating = updateMutation.isPending;

  const getButtonText = (isEditing: boolean) => {
    if (isCreating) {
      return tCommonStates("creating");
    }

    if (isUpdating) {
      return tCommonStates("updating");
    }

    return isEditing ? tCommonActions("update") : tCommonActions("create");
  };

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

    createMutation.mutate(payload, {
      onSuccess,
    });
  };

  return {
    isSubmitting,
    isCreating,
    isUpdating,
    getButtonText,
    submit,
  };
}
