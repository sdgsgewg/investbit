import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  CategoryListItem,
  UpsertCategoryInput,
} from "@/types/reksadana/category";
import { useCreateCategory } from "./categories/useCreateCategory";
import { useUpdateCategory } from "./categories/useUpdateCategory";
import { useDeleteCategory } from "./categories/useDeleteCategory";

interface UseCategoryDataReturn {
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
}

export const useCategoryData = (): UseCategoryDataReturn => {
  const t = useTranslations("");
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");

  const [isEditing, setIsEditing] = useState(false);

  const emptyCategoryForm: UpsertCategoryInput = {
    id: "",
    name: "",
  };
  const [initialForm, setInitialForm] =
    useState<UpsertCategoryInput>(emptyCategoryForm);
  const [form, setForm] = useState<UpsertCategoryInput>(emptyCategoryForm);

  const resetForm = () => {
    setForm(emptyCategoryForm);
    setInitialForm(emptyCategoryForm);
    setIsEditing(false);
  };

  const createMutation = useCreateCategory(() => {
    resetForm();
  });

  const updateMutation = useUpdateCategory(() => {
    resetForm();
  });

  const deleteMutation = useDeleteCategory();

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
    if (
      !confirm(
        `${t(`common.crud.confirm.delete`, {
          entity: t(`entities.rdCategory`),
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
    const isFilled = form.name.trim().length > 0;

    if (!isFilled) return false;

    if (!isEditing) return true;

    if (!initialForm) return false;

    const isChanged = form.name !== initialForm.name;

    return isChanged;
  };

  const handleSubmit = async () => {
    const payload: UpsertCategoryInput = {
      name: form.name,
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
    canSubmit,
    form,
    setForm,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  };
};
