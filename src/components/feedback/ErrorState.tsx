"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title,
  description,
  onRetry,
}: ErrorStateProps) {
  const t = useTranslations("common.states");

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <AlertCircle className="mb-5 size-14 text-destructive" />

        <h2 className="text-xl font-semibold">{title ?? t("errorTitle")}</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {description ?? t("errorDescription")}
        </p>

        {onRetry && (
          <Button className="mt-6" onClick={onRetry}>
            <RefreshCw className="mr-2 size-4" />
            {t("retry")}
          </Button>
        )}
      </div>
    </div>
  );
}
