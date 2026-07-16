import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { getNameFromPayload } from "@/lib/crud/payload";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { Entity } from "@/config/entities";
import { CrudAction } from "@/types/crud";
import { getApiErrorMessage, hasDuplicateError } from "@/lib/crud/error";

interface CrudMutationOptions<TVariables> {
  mutationFn: (variables: TVariables) => Promise<unknown>;

  queryKey: readonly unknown[];

  allowRedirect?: boolean;

  redirectTo?: string;

  entityKey: Entity;

  action: CrudAction;

  getPayload?: (variables: TVariables) => unknown;

  onSuccess?: (data: unknown, variables: TVariables) => void;
}

export function useCrudMutation<TVariables>({
  mutationFn,
  queryKey,
  allowRedirect = false,
  redirectTo,
  entityKey,
  action,
  getPayload,
  onSuccess,
}: CrudMutationOptions<TVariables>) {
  const queryClient = useQueryClient();

  const router = useRouter();

  const locale = useLocale();

  const t = useTranslations();

  return useMutation({
    mutationFn,

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey,
      });

      if (entityKey === "rdRecord") {
        alert(
          `${t(`common.crud.success.${action}`, {
            entity: t(`entities.${entityKey}`),
          })}`,
        );
      } else {
        const payload = getPayload ? getPayload(variables) : variables;

        const name = getNameFromPayload(payload);

        alert(
          `${t(`common.crud.success.${action}`, {
            entity: t(`entities.${entityKey}`),
          })}: ${name}`,
        );
      }

      onSuccess?.(data, variables);

      if (redirectTo) {
        router.push(`/${locale}/${redirectTo}`);
      } else if (allowRedirect) {
        router.back();
      }
    },

    onError: (error) => {
      console.log("Error: ", JSON.stringify(error, null, 2));

      if (isLikelyConnectionError(error)) {
        alert(t("common.feedback.connectionIssue.actionFailed"));
        return;
      }

      if (hasDuplicateError(error)) {
        alert(
          t("common.crud.error.duplicate", {
            entity: t(`entities.${entityKey}`),
          }),
        );
        return;
      }

      alert(
        [
          t(`common.crud.error.${action}`, {
            entity: t(`entities.${entityKey}`),
          }),
          getApiErrorMessage(error),
        ]
          .filter(Boolean)
          .join(": "),
      );
    },
  });
}
