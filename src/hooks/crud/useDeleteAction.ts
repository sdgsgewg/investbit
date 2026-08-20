import { Entity } from "@/config/entities";
import { useTranslations } from "next-intl";

interface UseDeleteActionOptions<TItem, TVariables> {
  deleteMutation: {
    mutate: (variables: TVariables) => void;
  };

  entity: Entity;

  getVariables: (item: TItem) => TVariables;
}

export function useDeleteAction<TItem extends { id: string }, TVariables>({
  deleteMutation,
  entity,
  getVariables,
}: UseDeleteActionOptions<TItem, TVariables>) {
  const t = useTranslations("common");
  const tEntities = useTranslations("entities");

  const handleDelete = (item: TItem) => {
    if (
      !confirm(
        t("crud.confirm.delete", {
          entity: tEntities(entity).toLowerCase(),
        }),
      )
    ) {
      return;
    }

    deleteMutation.mutate(getVariables(item));
  };

  return handleDelete;
}
