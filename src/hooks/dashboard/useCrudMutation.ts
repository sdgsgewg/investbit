"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { getNameFromPayload } from "@/lib/crud/payload";
import { CrudMutationOptions } from "@/types/crud";
import { handleCrudError } from "@/lib/react-query/config/crud-feedback";
import { toast } from "sonner";

export function useCrudMutation<TVariables>({
  mutationFn,
  invalidateQueries,
  entityKey,
  action,
  getPayload,
  onSuccess,
  onError,
}: CrudMutationOptions<TVariables>) {
  const queryClient = useQueryClient();

  const t = useTranslations();

  return useMutation({
    mutationFn,

    onSuccess: (data, variables) => {
      invalidateQueries?.forEach((filters) => {
        queryClient.invalidateQueries(filters);
      });

      const modifiedEntity = t(`entities.${entityKey}`).toLocaleLowerCase();

      const payload = getPayload ? getPayload(variables) : variables;

      const name = getNameFromPayload(payload);

      if (name) {
        toast.success(
          `${t(`common.crud.success.${action}`, {
            entity: modifiedEntity,
          })}: ${name}`,
        );
      } else {
        toast.success(
          `${t(`common.crud.success.${action}`, {
            entity: modifiedEntity,
          })}.`,
        );
      }

      onSuccess?.(data, variables);
    },

    onError: (error) => {
      handleCrudError({
        error,
        t,
        entityKey,
        action,
        onError,
      });
    },
  });
}
