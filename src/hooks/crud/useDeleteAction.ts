import { useTranslations } from "next-intl";

interface UseDeleteActionOptions<TItem, TVariables> {
  deleteMutation: {
    mutate: (variables: TVariables) => void;
  };

  entity: string;

  getVariables: (item: TItem) => TVariables;
}

export function useDeleteAction<TItem extends { id: string }, TVariables>({
  deleteMutation,
  entity,
  getVariables,
}: UseDeleteActionOptions<TItem, TVariables>) {
  const t = useTranslations("common");

  const handleDelete = (item: TItem) => {
    if (
      !confirm(
        t("crud.confirm.delete", {
          entity: entity.toLowerCase(),
        }),
      )
    ) {
      return;
    }

    deleteMutation.mutate(getVariables(item));
  };

  return handleDelete;
}
