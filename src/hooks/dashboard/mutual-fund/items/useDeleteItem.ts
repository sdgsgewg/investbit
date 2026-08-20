import { deleteItem } from "@/lib/api/mutual-fund/items";
import { useCrudMutation } from "../../useCrudMutation";
import { itemKeys } from "@/lib/react-query/keys/itemKeys";

interface DeleteItemPayload {
  id: string;
  data: unknown;
}

export function useDeleteItem() {
  return useCrudMutation<DeleteItemPayload>({
    mutationFn: ({ id }) => deleteItem(id),

    invalidateQueries: [{ queryKey: itemKeys.lists() }],

    entityKey: "rdItem",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
