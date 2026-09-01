"use client";

import { Toaster } from "@/components/ui/sonner";

/** Mounts the project's shadcn/Sonner toaster once for the application. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}
