import { updateCategory } from "@/lib/api/mutual-fund/categories";
import { useCrudMutation } from "../../useCrudMutation";
import { categoryKeys } from "@/lib/react-query/keys";

interface UpdateCategoryPayload {
  id: string;
  data: unknown;
}

export function useUpdateCategory(onSuccess?: () => void) {
  return useCrudMutation<UpdateCategoryPayload>({
    mutationFn: ({ id, data }) => updateCategory(id, data),

    invalidateQueries: [{ queryKey: categoryKeys.lists() }],

    entityKey: "rdCategory",

    action: "update",

    getPayload: ({ data }) => data,

    onSuccess,
  });
}
