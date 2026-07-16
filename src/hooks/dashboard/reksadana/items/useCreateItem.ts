import { createItem } from "@/lib/api/reksadana/items";
import { useCrudMutation } from "../../useCrudMutation";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useCreateItem(onSuccess?: () => void) {
  return useCrudMutation({
    mutationFn: createItem,

    queryKey: queryKeys.items(),

    entityKey: "rdItem",

    action: "create",

    onSuccess,
  });
}
