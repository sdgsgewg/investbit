import { deleteCategory } from "@/lib/api/reksadana/categories";
import { useCrudMutation } from "../../useCrudMutation";
import { queryKeys } from "@/lib/react-query/queryKeys";

interface DeleteCategoryPayload {
  id: string;
  data: unknown;
}

export function useDeleteCategory() {
  return useCrudMutation<DeleteCategoryPayload>({
    mutationFn: ({ id }) => deleteCategory(id),

    queryKey: queryKeys.categories(),

    entityKey: "rdCategory",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
