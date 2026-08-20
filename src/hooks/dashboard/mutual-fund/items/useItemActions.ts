import { useTranslations } from "next-intl";
import { useDeleteAction } from "@/hooks/crud/useDeleteAction";
import { useDeleteItem } from "./useDeleteItem";
import { ItemListItem } from "@/types/mutual-fund/items";

export function useItemActions() {
  const tEntities = useTranslations("entities");

  const deleteMutation = useDeleteItem();

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: tEntities("item"),
    getVariables: (item: ItemListItem) => ({
      id: item.id,
      data: item,
    }),
  });

  return {
    handleDelete,
  };
}
