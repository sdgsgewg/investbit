import { updateItem } from "@/lib/api/reksadana/items";
import { useCrudMutation } from "../../useCrudMutation";
import { queryKeys } from "@/lib/react-query/queryKeys";

interface UpdateItemPayload {
  id: string;
  data: unknown;
}

export function useUpdateItem(onSuccess?: () => void) {
  return useCrudMutation<UpdateItemPayload>({
    mutationFn: ({ id, data }) => updateItem(id, data),

    queryKey: queryKeys.items(),

    entityKey: "rdItem",

    action: "update",

    getPayload: ({ data }) => data,

    onSuccess,
  });
}
