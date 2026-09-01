import { updateItem } from "@/lib/api/mutual-fund/items";
import { useCrudMutation } from "../../useCrudMutation";
import { itemKeys } from "@/lib/react-query/keys/itemKeys";

interface UpdateItemPayload {
  id: string;
  data: unknown;
}

export function useUpdateItem() {
  return useCrudMutation<UpdateItemPayload>({
    mutationFn: ({ id, data }) => updateItem(id, data),

    invalidateQueries: [{ queryKey: itemKeys.lists() }],

    entityKey: "rdItem",

    action: "update",

    getPayload: ({ data }) => data,
  });
}
