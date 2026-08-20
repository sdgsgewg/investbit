import { ItemListItem, UpsertItemInput } from "@/types/mutual-fund/items";
import { useMemo, useState } from "react";

const emptyItemForm: UpsertItemInput = {
  name: "",
  category_id: "",
};

export function useItemForm() {
  const [form, setForm] = useState<UpsertItemInput>(emptyItemForm);

  const [initialForm, setInitialForm] =
    useState<UpsertItemInput>(emptyItemForm);

  // const isEditing = Boolean(form.id);
  const [isEditing, setIsEditing] = useState(false);

  const canSubmit = useMemo(() => {
    const isFilled =
      form.name.trim().length > 0 && form.category_id.trim().length > 0;

    if (!isFilled) {
      return false;
    }

    // Create
    if (!isEditing) {
      return true;
    }

    // Edit
    return (
      form.name !== initialForm.name &&
      form.category_id !== initialForm.category_id
    );
  }, [form, initialForm, isEditing]);

  const handleEdit = (item: ItemListItem) => {
    const mapped: UpsertItemInput = {
      id: item.id,
      name: item.name,
      category_id: item.category.id,
    };

    setForm(mapped);
    setInitialForm(mapped);
    setIsEditing(true);
  };

  const buildPayload = () => ({
    name: form.name,
    category_id: form.category_id,
  });

  const resetForm = () => {
    setForm(emptyItemForm);
    setInitialForm(emptyItemForm);
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
