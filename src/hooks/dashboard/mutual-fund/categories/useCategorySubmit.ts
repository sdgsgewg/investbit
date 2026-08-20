import { UpsertCategoryInput } from "@/types/mutual-fund/categories";
import { useTranslations } from "next-intl";
import { useCreateCategory } from "./useCreateCategory";
import { useUpdateCategory } from "./useUpdateCategory";

interface SubmitOptions {
  id?: string;
  payload: UpsertCategoryInput;
  onSuccess?: () => void;
}

export function useCategorySubmit() {
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");

  const createMutation = useCreateCategory();

  const updateMutation = useUpdateCategory();

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
