import { useForm } from "@tanstack/react-form";

import { categoryMutationSchema } from "@/lib/validations/mutual-fund/categories.schema";
import {
  CategoryListResponse,
  UpsertCategoryInput,
} from "@/types/mutual-fund/categories";
import { useState } from "react";

const createEmptyCategoryForm = (): UpsertCategoryInput => ({
  id: "",
  name: "",
});

interface UseCategoryFormOptions {
  onSubmit: (payload: UpsertCategoryInput) => void;
}

export function useCategoryForm({ onSubmit }: UseCategoryFormOptions) {
  const form = useForm({
    defaultValues: createEmptyCategoryForm(),

    validators: {
      onMount: categoryMutationSchema,
      onChange: categoryMutationSchema,
      onSubmit: categoryMutationSchema,
    },

    onSubmit: async ({ value }) => {
      const payload: UpsertCategoryInput = {
        id: value.id,
        name: value.name,
      };

      onSubmit(payload);
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (category: CategoryListResponse) => {
    setIsEditing(true);
    form.setFieldValue("id", category.id);
    form.setFieldValue("name", category.name);
  };

  const resetForm = () => {
    setIsEditing(false);
    form.reset();
  };

  return {
    form,
    isEditing,
    handleEdit,
    resetForm,
  };
}

export type CategoryForm = ReturnType<typeof useCategoryForm>;
