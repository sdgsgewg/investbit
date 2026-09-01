"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type PendingNavigation =
  | { type: "href"; href: string }
  | { type: "history" }
  | null;

interface Props {
  when: boolean;
}

/**
 * Warns before a user abandons a dirty form. It protects links, browser Back,
 * and document unloads; successful form submissions can still navigate away.
 */
const UnsavedChangesGuard = ({ when }: Props) => {
  const t = useTranslations("common.unsavedChanges");
  const [isOpen, setIsOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] =
    useState<PendingNavigation>(null);
  const whenRef = useRef(when);
  const hasHistoryGuardRef = useRef(false);
  const allowHistoryNavigationRef = useRef(false);

  useEffect(() => {
    whenRef.current = when;
  }, [when]);

  useEffect(() => {
    if (!when) {
      hasHistoryGuardRef.current = false;
      return;
    }

    // Add a same-URL history entry. Pressing Back lands on the original entry,
    // so we can ask before the browser reaches the previous page.
    if (!hasHistoryGuardRef.current) {
      window.history.pushState(
        { ...window.history.state, unsavedChangesGuard: true },
        "",
        window.location.href,
      );
      hasHistoryGuardRef.current = true;
    }

    const requestNavigation = (nextNavigation: PendingNavigation) => {
      setPendingNavigation(nextNavigation);
      setIsOpen(true);
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        !whenRef.current ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");

      if (
        !anchor ||
        anchor.target ||
        anchor.hasAttribute("download") ||
        anchor.href.startsWith("javascript:")
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);

      if (destination.href === window.location.href) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      requestNavigation({ type: "href", href: destination.href });
    };

    const handlePopState = () => {
      if (allowHistoryNavigationRef.current || !whenRef.current) {
        return;
      }

      requestNavigation({ type: "history" });
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!whenRef.current) {
        return;
      }

      event.preventDefault();
      event.returnValue = "";
    };

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [when]);

  const stayOnPage = () => {
    if (pendingNavigation?.type === "history") {
      window.history.pushState(
        { ...window.history.state, unsavedChangesGuard: true },
        "",
        window.location.href,
      );
    }

    setIsOpen(false);
    setPendingNavigation(null);
  };

  const leavePage = () => {
    const navigation = pendingNavigation;

    // Disable guard checks since the user has explicitly confirmed they want to leave
    whenRef.current = false;

    setIsOpen(false);
    setPendingNavigation(null);

    if (navigation?.type === "href") {
      window.location.assign(navigation.href);
      return;
    }

    if (navigation?.type === "history") {
      allowHistoryNavigationRef.current = true;
      window.history.back();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && stayOnPage()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={stayOnPage}>
            {t("stay")}
          </Button>
          <Button variant="destructive" onClick={leavePage}>
            {t("leave")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnsavedChangesGuard;
