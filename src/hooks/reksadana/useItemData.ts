import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { queryConfig } from "@/lib/react-query/queryConfig";
import {
  createItem,
  deleteItem,
  fetchItems,
  updateItem,
} from "@/lib/api/reksadana/items";
import { ItemListItem, UpsertItemInput } from "@/types/reksadana/item";
import { isLikelyConnectionError } from "@/lib/utils/error";

interface UseItemDataReturn {
  items: ItemListItem[];
  loading: boolean;
  retrying: boolean;
  isEditing: boolean;
  buttonText: string;
  isSubmitting: boolean;
  initialForm: UpsertItemInput | null;
  form: UpsertItemInput;
  setForm: React.Dispatch<React.SetStateAction<UpsertItemInput>>;
  canSubmit: () => boolean;
  handleSubmit: () => Promise<void>;
  handleEdit: (item: ItemListItem) => void;
  handleDelete: (item: ItemListItem) => Promise<void>;
  resetForm: () => void;
  loadError: unknown | null;
  retryLoad: () => void;
}

export const useItemData = (): UseItemDataReturn => {
  const tItems = useTranslations("reksadana.items");
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");
  const tCommon = useTranslations("common");

  const queryClient = useQueryClient();
  const hasDuplicateError = (error: unknown) =>
    axios.isAxiosError<{ error?: string }>(error) &&
    error.response?.data?.error?.includes("exists");

  const {
    data: items = [],
    isLoading: isLoadingItems,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.items(),
    queryFn: fetchItems,
    ...queryConfig,
  });

  const [initialForm, setInitialForm] = useState<UpsertItemInput | null>(null);
  const [form, setForm] = useState<UpsertItemInput>({
    id: "",
    name: "",
    category_id: "",
  });

  const canSubmit = (): boolean => {
    const isFilled =
      form.name.trim().length > 0 && form.category_id.trim().length > 0;

    if (!isFilled) return false;

    if (!isEditing) return true;

    if (!initialForm) return false;

    const isChanged =
      form.name !== initialForm.name ||
      form.category_id !== initialForm.category_id;

    return isChanged;
  };

  const createMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.items() });
      alert(`${tItems("form.success.add")} ${form.name}`);
      resetForm();
    },
    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
      } else if (hasDuplicateError(error)) {
        alert(`${tItems("form.errors.add.duplicate")}`);
      } else {
        alert(`${tItems("form.errors.add.failed")}`);
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) =>
      updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.items() });
      alert(`${tItems("form.success.edit")} ${form.name}`);
      resetForm();
    },
    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
      } else if (hasDuplicateError(error)) {
        alert(`${tItems("form.errors.edit.duplicate")}`);
      } else {
        alert(`${tItems("form.errors.edit.failed")}`);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string; name: string }) => deleteItem(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.items() });
      alert(`${tItems("form.success.delete")} ${variables.name}`);
    },
    onError: (error) => {
      alert(
        isLikelyConnectionError(error)
          ? tCommon("feedback.connectionIssue.actionFailed")
          : `${tItems("form.errors.delete.failed")}`,
      );
    },
  });

  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const [isEditing, setIsEditing] = useState(false);

  const buttonText = isSubmitting
    ? isEditing
      ? tCommonStates("updating")
      : tCommonStates("creating")
    : isEditing
      ? tCommonActions("update")
      : tCommonActions("create");

  const handleSubmit = async () => {
    if (isEditing) {
      updateMutation.mutate({
        id: form.id as string,
        data: { name: form.name, category_id: form.category_id },
      });
    } else {
      createMutation.mutate({
        name: form.name,
        category_id: form.category_id,
      });
    }
  };

  const handleEdit = (item: ItemListItem) => {
    const mapped = {
      id: item.id,
      name: item.name,
      category_id: item.category.id,
    };

    setForm(mapped);
    setInitialForm(mapped);
    setIsEditing(true);
  };

  const handleDelete = async (item: ItemListItem) => {
    if (!confirm(`${tItems("form.confirm.delete")}`)) return;

    deleteMutation.mutate({
      id: item.id,
      name: item.name,
    });
  };

  const resetForm = () => {
    setForm({ id: "", name: "", category_id: "" });
    setInitialForm(null);
    setIsEditing(false);
  };

  return {
    items,
    loading: isLoadingItems,
    retrying: isRefetching,
    isEditing,
    buttonText,
    isSubmitting,
    initialForm,
    form,
    setForm,
    canSubmit,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
};
