import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "@/lib/react-query/queryKeys";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "@/lib/api/reksadana";
import { queryConfig } from "@/lib/react-query/queryConfig";
import {
  CategoryListItem,
  UpsertCategoryInput,
} from "@/types/reksadana/category";
import { isLikelyConnectionError } from "@/lib/utils/error";

interface UseCategoryDataReturn {
  categories: CategoryListItem[];
  loading: boolean;
  retrying: boolean;
  isEditing: boolean;
  buttonText: string;
  isSubmitting: boolean;
  form: UpsertCategoryInput;
  setForm: React.Dispatch<React.SetStateAction<UpsertCategoryInput>>;
  canSubmit: () => boolean;
  handleSubmit: () => Promise<void>;
  handleEdit: (item: CategoryListItem) => void;
  handleDelete: (item: CategoryListItem) => Promise<void>;
  resetForm: () => void;
  loadError: unknown | null;
  retryLoad: () => void;
}

export const useCategoryData = (): UseCategoryDataReturn => {
  const tCategories = useTranslations("reksadana.categories");
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");
  const tCommon = useTranslations("common");

  const queryClient = useQueryClient();
  const hasDuplicateError = (error: unknown) =>
    axios.isAxiosError<{ error?: string }>(error) &&
    error.response?.data?.error?.includes("exists");

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.categories(),
    queryFn: fetchCategories,
    ...queryConfig,
  });

  const [initialForm, setInitialForm] = useState<UpsertCategoryInput | null>(
    null,
  );
  const [form, setForm] = useState<UpsertCategoryInput>({
    id: "",
    name: "",
  });

  const canSubmit = (): boolean => {
    const isFilled = form.name.trim().length > 0;

    if (!isFilled) return false;

    if (!isEditing) return true;

    if (!initialForm) return false;

    const isChanged = form.name !== initialForm.name;

    return isChanged;
  };

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories() });
      alert(`${tCategories("form.success.add")} ${form.name}`);
      resetForm();
    },
    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
      } else if (hasDuplicateError(error)) {
        alert(`${tCategories("form.errors.add.duplicate")}`);
      } else {
        alert(`${tCategories("form.errors.add.failed")}`);
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) =>
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories() });
      alert(`${tCategories("form.success.edit")} ${form.name}`);
      resetForm();
    },
    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
      } else if (hasDuplicateError(error)) {
        alert(`${tCategories("form.errors.edit.duplicate")}`);
      } else {
        alert(`${tCategories("form.errors.edit.failed")}`);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string; name: string }) => deleteCategory(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories() });
      alert(`${tCategories("form.success.delete")} ${variables.name}`);
    },
    onError: (error) => {
      alert(
        isLikelyConnectionError(error)
          ? tCommon("feedback.connectionIssue.actionFailed")
          : `${tCategories("form.errors.delete.failed")}`,
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
        data: { name: form.name },
      });
    } else {
      createMutation.mutate({
        name: form.name,
      });
    }
  };

  const handleEdit = (item: CategoryListItem) => {
    const mapped = {
      id: item.id,
      name: item.name,
    };

    setForm(mapped);
    setInitialForm(mapped);
    setIsEditing(true);
  };

  const handleDelete = async (item: CategoryListItem) => {
    if (!confirm(`${tCategories("form.confirm.delete")}`)) return;

    deleteMutation.mutate({
      id: item.id,
      name: item.name,
    });
  };

  const resetForm = () => {
    setForm({ id: "", name: "" });
    setInitialForm(null);
    setIsEditing(false);
  };

  return {
    categories,
    loading: isLoadingCategories,
    retrying: isRefetching,
    isEditing,
    buttonText,
    isSubmitting,
    canSubmit,
    form,
    setForm,
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
