"use client";

import { useTranslations } from "next-intl";

interface ConnectionErrorAlertProps {
  onRetry?: () => void;
  retrying?: boolean;
}

const ConnectionErrorAlert = ({
  onRetry,
  retrying = false,
}: ConnectionErrorAlertProps) => {
  const tCommon = useTranslations("common");

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-100">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-semibold">{tCommon("feedback.connectionIssue.title")}</p>
          <p className="text-sm text-amber-800/90 dark:text-amber-200/90">
            {tCommon("feedback.connectionIssue.description")}
          </p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            disabled={retrying}
            className="inline-flex items-center justify-center rounded-md border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-900 transition-colors hover:bg-amber-100 disabled:pointer-events-none disabled:opacity-60 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100 dark:hover:bg-amber-900/50"
          >
            {retrying
              ? tCommon("states.loading")
              : tCommon("actions.retry")}
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectionErrorAlert;
