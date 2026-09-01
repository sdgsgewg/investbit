import { createCategory } from "@/lib/api/mutual-fund/categories";
import { useCrudMutation } from "../../useCrudMutation";
import { categoryKeys } from "@/lib/react-query/keys";

export function useCreateCategory(onSuccess?: () => void) {
  return useCrudMutation({
    mutationFn: createCategory,

    invalidateQueries: [{ queryKey: categoryKeys.lists() }],

    entityKey: "rdCategory",

    action: "create",

    onSuccess,
  });
}
