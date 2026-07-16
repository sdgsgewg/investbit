import { deleteItem } from "@/lib/api/reksadana/items";
import { useCrudMutation } from "../../useCrudMutation";
import { queryKeys } from "@/lib/react-query/queryKeys";

interface DeleteItemPayload {
  id: string;
  data: unknown;
}

export function useDeleteItem() {
  return useCrudMutation<DeleteItemPayload>({
    mutationFn: ({ id }) => deleteItem(id),

    queryKey: queryKeys.items(),

    entityKey: "rdItem",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
