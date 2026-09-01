import { deleteCategory } from "@/lib/api/mutual-fund/categories";
import { useCrudMutation } from "../../useCrudMutation";
import { categoryKeys } from "@/lib/react-query/keys";

interface DeleteCategoryPayload {
  id: string;
  data: unknown;
}

export function useDeleteCategory() {
  return useCrudMutation<DeleteCategoryPayload>({
    mutationFn: ({ id }) => deleteCategory(id),

    invalidateQueries: [{ queryKey: categoryKeys.lists() }],

    entityKey: "rdCategory",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
