import { useState } from "react";
import { useTranslations } from "next-intl";
import { ItemListItem, UpsertItemInput } from "@/types/reksadana/item";
import { useCreateItem } from "./useCreateItem";
import { useUpdateItem } from "./useUpdateItem";
import { useDeleteItem } from "./useDeleteItem";

interface UseItemDataReturn {
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
}

export const useItemData = (): UseItemDataReturn => {
  const t = useTranslations("");
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");

  const [isEditing, setIsEditing] = useState(false);

  const emptyItemForm: UpsertItemInput = {
    id: "",
    name: "",
    category_id: "",
  };
  const [initialForm, setInitialForm] =
    useState<UpsertItemInput>(emptyItemForm);
  const [form, setForm] = useState<UpsertItemInput>(emptyItemForm);

  const resetForm = () => {
    setForm(emptyItemForm);
    setInitialForm(emptyItemForm);
    setIsEditing(false);
  };

  const createMutation = useCreateItem(() => {
    resetForm();
  });

  const updateMutation = useUpdateItem(() => {
    resetForm();
  });

  const deleteMutation = useDeleteItem();

  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const buttonText = isSubmitting
    ? isEditing
      ? tCommonStates("updating")
      : tCommonStates("creating")
    : isEditing
      ? tCommonActions("update")
      : tCommonActions("create");

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
    if (
      !confirm(
        `${t(`common.crud.confirm.delete`, {
          entity: t(`entities.rdItem`),
        })}`,
      )
    )
      return;

    deleteMutation.mutate({
      id: item.id,
      data: item,
    });
  };

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

  const handleSubmit = async () => {
    const payload: UpsertItemInput = {
      name: form.name,
      category_id: form.category_id,
    };

    if (isEditing) {
      updateMutation.mutate({
        id: form.id!,
        data: payload,
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  return {
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
