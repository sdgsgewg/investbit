import { getApiErrorMessage, hasDuplicateError } from "@/lib/crud/error";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { _Translator } from "next-intl";

export function handleCrudError(
  error: unknown,
  t: _Translator,
  entity: string,
  action: "create" | "update" | "delete",
) {
  if (isLikelyConnectionError(error)) {
    alert(t("common.feedback.connectionIssue.actionFailed"));
    return;
  }

  if (hasDuplicateError(error)) {
    alert(
      t("common.crud.error.duplicate", {
        entity,
      }),
    );
    return;
  }

  alert(
    [
      t(`common.crud.error.${action}`, {
        entity,
      }),
      getApiErrorMessage(error),
    ]
      .filter(Boolean)
      .join(": "),
  );
}
