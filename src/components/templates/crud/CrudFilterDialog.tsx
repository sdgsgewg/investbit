"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

interface CrudFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: string;
  description?: string;

  children: ReactNode;

  onApply: () => void;
  onReset?: () => void;

  loading?: boolean;
}

export default function CrudFilterDialog({
  open,
  onOpenChange,
  title = "Filter",
  description,

  children,

  onApply,
  onReset,

  loading = false,
}: CrudFilterDialogProps) {
  const tCommonActions = useTranslations("common.actions");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="space-y-4">{children}</div>

        <DialogFooter>
          {onReset && (
            <Button
              type="button"
              variant="outline"
              onClick={onReset}
              disabled={loading}
            >
              {tCommonActions("reset")}
            </Button>
          )}

          <Button type="button" onClick={onApply} disabled={loading}>
            {tCommonActions("apply")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
