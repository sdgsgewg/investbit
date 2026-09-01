import { useEntityForm } from "@/hooks/crud";
import { categoryMutationSchema } from "@/lib/validations/mutual-fund/categories.schema";
import {
  CategoryListItem,
  UpsertCategoryInput,
} from "@/types/mutual-fund/categories";
import { useState } from "react";

const createEmptyCategoryForm = (): UpsertCategoryInput => ({
  name: "",
});

export function useCategoryForm() {
  const {
    form,
    setForm,
    initialForm,
    updateField,
    errors,
    isDirty,
    canSubmit,
    validate,
    resetForm,
  } = useEntityForm({
    initialValue: createEmptyCategoryForm(),
    schema: categoryMutationSchema,

    dirtyFields: ["name"],

    requiredFields: ["name"],
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (category: CategoryListItem) => {
    const mapped: UpsertCategoryInput = {
      id: category.id,
      name: category.name,
    };

    resetForm(mapped);

    setIsEditing(true);
  };

  const handleResetForm = () => {
    resetForm();
    setIsEditing(false);
  };

  const buildPayload = () => ({
    name: form.name,
  });

  return {
    form,
    initialForm,
    setForm,

    isDirty,
    isEditing,
    errors,

    updateField,
    handleEdit,

    validate,
    canSubmit,
    buildPayload,

    resetForm: handleResetForm,
  };
}
