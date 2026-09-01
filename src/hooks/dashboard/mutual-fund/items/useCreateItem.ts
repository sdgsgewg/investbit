import { createItem } from "@/lib/api/mutual-fund/items";
import { useCrudMutation } from "../../useCrudMutation";
import { itemKeys } from "@/lib/react-query/keys/itemKeys";

export function useCreateItem() {
  return useCrudMutation({
    mutationFn: createItem,

    invalidateQueries: [{ queryKey: itemKeys.lists() }],

    entityKey: "rdItem",

    action: "create",
  });
}
