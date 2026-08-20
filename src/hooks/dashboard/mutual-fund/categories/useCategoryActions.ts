import { useDeleteAction } from "@/hooks/crud";
import { useDeleteCategory } from "./useDeleteCategory";
import { CategoryListItem } from "@/types/mutual-fund/categories";

export function useCategoryActions() {
  const deleteMutation = useDeleteCategory();

  const handleDelete = useDeleteAction({
    deleteMutation,
    entity: "rdCategory",
    getVariables: (category: CategoryListItem) => ({
      id: category.id,
      data: category,
    }),
  });

  return {
    handleDelete,
  };
}
