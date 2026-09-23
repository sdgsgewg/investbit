import { itemMutationSchema } from "@/lib/validations/mutual-fund/items.schema";
import { ItemEditResponse, UpsertItemInput } from "@/types/mutual-fund/items";
import { useForm } from "@tanstack/react-form";
import { useMemo } from "react";

interface UseItemFormOptions {
  item?: ItemEditResponse;
  onSubmit: (payload: UpsertItemInput) => void;
}

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

export function useItemForm({ item, onSubmit }: UseItemFormOptions) {
  const defaultValues = useMemo(
    () => (item ? mapItem(item) : createEmptyItemForm()),
    [item],
  );

  const form = useForm({
    defaultValues,

    validators: {
      onMount: itemMutationSchema,
      onChange: itemMutationSchema,
      onSubmit: itemMutationSchema,
    },

    onSubmit: async ({ value }) => {
      const payload = {
        name: value.name,
        category_id: value.category_id,
        total_aum: value.total_aum,
      };

      onSubmit(payload);
    },
  });

  return form;
}
