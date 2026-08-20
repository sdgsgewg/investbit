import {
  CategoryListItem,
  UpsertCategoryInput,
} from "@/types/mutual-fund/categories";
import { useMemo, useState } from "react";

const emptyCategoryForm: UpsertCategoryInput = {
  name: "",
};

export function useCategoryForm() {
  const [form, setForm] = useState<UpsertCategoryInput>(emptyCategoryForm);

  const [initialForm, setInitialForm] =
    useState<UpsertCategoryInput>(emptyCategoryForm);

  // const isEditing = Boolean(form.id);
  const [isEditing, setIsEditing] = useState(false);

  const canSubmit = useMemo(() => {
    const isFilled = form.name.trim().length > 0;

    if (!isFilled) {
      return false;
    }

    // Create
    if (!isEditing) {
      return true;
    }

    // Edit
    return form.name !== initialForm.name;
  }, [form, initialForm, isEditing]);

  const handleEdit = (category: CategoryListItem) => {
    const mapped: UpsertCategoryInput = {
      id: category.id,
      name: category.name,
    };

    setForm(mapped);
    setInitialForm(mapped);
    setIsEditing(true);
  };

  const buildPayload = () => ({
    name: form.name,
  });

  const resetForm = () => {
    setForm(emptyCategoryForm);
    setInitialForm(emptyCategoryForm);
    setIsEditing(false);
  };

  return {
    isEditing,
    form,
    setForm,
    initialForm,
    canSubmit,
    handleEdit,
    buildPayload,
    resetForm,
  };
}
