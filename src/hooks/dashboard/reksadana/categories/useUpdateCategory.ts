import { updateCategory } from "@/lib/api/reksadana/categories";
import { useCrudMutation } from "../../useCrudMutation";
import { queryKeys } from "@/lib/react-query/queryKeys";

interface UpdateCategoryPayload {
  id: string;
  data: unknown;
}

export function useUpdateCategory(onSuccess?: () => void) {
  return useCrudMutation<UpdateCategoryPayload>({
    mutationFn: ({ id, data }) => updateCategory(id, data),

    queryKey: queryKeys.categories(),

    entityKey: "rdCategory",

    action: "update",

    getPayload: ({ data }) => data,

    onSuccess,
  });
}
