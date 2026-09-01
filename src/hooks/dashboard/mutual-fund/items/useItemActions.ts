import { useDeleteAction } from "@/hooks/crud/useDeleteAction";
import { useDeleteItem } from "./useDeleteItem";
import { ItemListItem } from "@/types/mutual-fund/items";
import { useRouter } from "@/navigation";
import { ROUTES } from "@/constants/routes";

export function useItemActions() {
  const router = useRouter();

  const deleteMutation = useDeleteItem();

  const handleCreate = () => {
    router.push(ROUTES.DASHBOARD.MUTUAL_FUND.ITEMS.CREATE);
  };

  const handleEdit = (item: ItemListItem) => {
    router.push(`${ROUTES.DASHBOARD.MUTUAL_FUND.ITEMS.BASE}/${item.slug}/edit`);
  };

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: "rdItem",
    getVariables: (item: ItemListItem) => ({
      id: item.id,
      data: item,
    }),
  });

  return {
    handleCreate,
    handleEdit,
    handleDelete,
  };
}
