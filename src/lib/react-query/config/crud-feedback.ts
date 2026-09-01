import { Entity } from "@/config/entities";
import { getApiErrorMessage, hasDuplicateError } from "@/lib/crud/error";
import { getApiFormErrors } from "@/lib/forms/errors";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { CrudAction, CrudMutationError } from "@/types/crud";
import { _Translator } from "next-intl";
import { toast } from "sonner";

interface HandleCrudErrorOptions {
  error: unknown;
  t: _Translator;
  entityKey: Entity;
  action: CrudAction;
  onError?: (error: CrudMutationError) => void;
}

export function handleCrudError({
  error,
  t,
  entityKey,
  action,
  onError,
}: HandleCrudErrorOptions) {
  // Field Errors

  const fieldErrors = getApiFormErrors(error);

  if (fieldErrors) {
    toast.error(t("common.crud.error.validation"));
    onError?.({
      error,
      fieldErrors,
    });
    return;
  }

  // Non-Field Errors

  if (isLikelyConnectionError(error)) {
    toast.error(t("common.feedback.connectionIssue.actionFailed"));
    return;
  }

  if (hasDuplicateError(error)) {
    toast.error(
      getApiErrorMessage(error) ??
        t("common.crud.error.duplicate", {
          entity: t(`entities.${entityKey}`),
        }),
    );
    return;
  }

  toast.error(
    [
      t(`common.crud.error.${action}`, {
        entity: t(`entities.${entityKey}`).toLocaleLowerCase(),
      }),
      getApiErrorMessage(error),
    ]
      .filter(Boolean)
      .join(": "),
  );

  onError?.({
    error,
    fieldErrors: null,
  });
}
