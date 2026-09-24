import { useDeleteAction } from "@/hooks/crud";
import { useDeleteCategory } from "./useDeleteCategory";
import { CategoryListResponse } from "@/types/mutual-fund/categories";

export function useCategoryActions() {
  const deleteMutation = useDeleteCategory();

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: "rdCategory",
    getVariables: (category: CategoryListResponse) => ({
      id: category.id,
      data: category,
    }),
  });

  return {
    handleDelete,
  };
}
