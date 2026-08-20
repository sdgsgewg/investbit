import { useDeleteAction } from "@/hooks/crud/useDeleteAction";
import { useDeleteItem } from "./useDeleteItem";
import { ItemListItem } from "@/types/mutual-fund/items";

export function useItemActions() {
  const deleteMutation = useDeleteItem();

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: "rdItem",
    getVariables: (item: ItemListItem) => ({
      id: item.id,
      data: item,
    }),
  });

  return {
    handleDelete,
  };
}
