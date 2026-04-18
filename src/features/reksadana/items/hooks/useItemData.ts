import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { queryConfig } from "@/lib/react-query/queryConfig";
import {
  createItem,
  deleteItem,
  fetchItems,
  updateItem,
} from "@/lib/api/reksadana";
import { ItemData } from "@/features/reksadana/items/types/ItemData";
import { UpsertItem } from "@/features/reksadana/items/types/UpsertItem";

interface UseItemDataReturn {
  items: ItemData[];
  loading: boolean;
  isEditing: boolean;
  buttonText: string;
  isSubmitting: boolean;
  initialForm: UpsertItem | null;
  form: UpsertItem;
  setForm: React.Dispatch<React.SetStateAction<UpsertItem>>;
  canSubmit: () => boolean;
  handleSubmit: () => Promise<void>;
  handleEdit: (item: ItemData) => void;
  handleDelete: (item: ItemData) => Promise<void>;
  resetForm: () => void;
}

export const useItemData = (): UseItemDataReturn => {
  const tItems = useTranslations("reksadana.items");
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");

  const queryClient = useQueryClient();

  const { data: items = [], isLoading: isLoadingItems } = useQuery({
    queryKey: queryKeys.items(),
    queryFn: fetchItems,
    ...queryConfig,
  });

  const [initialForm, setInitialForm] = useState<UpsertItem | null>(null);
  const [form, setForm] = useState<UpsertItem>({
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
    onError: (error: any) => {
      if (error.response?.data?.error?.includes("exists")) {
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
      queryClient.invalidateQueries({ queryKey: queryKeys.categories() });
      alert(`${tItems("form.success.edit")} ${form.name}`);
      resetForm();
    },
    onError: (error: any) => {
      if (error.response?.data?.error?.includes("exists")) {
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
    onError: () => {
      alert(`${tItems("form.errors.delete.failed")}`);
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

  const handleEdit = (item: ItemData) => {
    const mapped = {
      id: item.id,
      name: item.name,
      category_id: item.category_id,
    };

    setForm(mapped);
    setInitialForm(mapped);
    setIsEditing(true);
  };

  const handleDelete = async (item: ItemData) => {
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
  };
};
