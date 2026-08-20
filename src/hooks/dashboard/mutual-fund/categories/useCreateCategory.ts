import { createCategory } from "@/lib/api/mutual-fund/categories";
import { useCrudMutation } from "../../useCrudMutation";
import { queryKeys } from "@/lib/react-query/queryKeys";

export function useCreateCategory(onSuccess?: () => void) {
  return useCrudMutation({
    mutationFn: createCategory,

    invalidateQueries: [{ queryKey: queryKeys.categories() }],

    entityKey: "rdCategory",

    action: "create",

    onSuccess,
  });
}
