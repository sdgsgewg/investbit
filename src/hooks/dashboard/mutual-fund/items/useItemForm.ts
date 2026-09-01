import { useEntityForm } from "@/hooks/crud";
import { itemMutationSchema } from "@/lib/validations/mutual-fund/items.schema";
import { ItemEditResponse, UpsertItemInput } from "@/types/mutual-fund/items";
import { useMemo } from "react";

const createEmptyItemForm = (): UpsertItemInput => ({
  name: "",
  category_id: "",
  total_aum: null,
});

function mapItem(item: ItemEditResponse): UpsertItemInput {
  const { id, name, categoryId, totalAum } = item;

  return {
    id,
    name,
    category_id: categoryId,
    total_aum: totalAum,
  };
}

export function useItemForm(item?: ItemEditResponse) {
  const initialValue = useMemo(
    () => (item ? mapItem(item) : createEmptyItemForm()),
    [item],
  );

  const { form, updateField, errors, isDirty, canSubmit, validate } =
    useEntityForm({
      initialValue,
      schema: itemMutationSchema,

      dirtyFields: ["name", "category_id", "total_aum"],

      requiredFields: ["name", "category_id", "total_aum"],
    });

  const buildPayload = () => ({
    name: form.name,
    category_id: form.category_id,
    total_aum: form.total_aum,
  });

  return {
    form,

    isDirty,
    errors,

    updateField,

    validate,
    canSubmit,
    buildPayload,
  };
}
