"use client";

import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/api/auth/login";
import { getApiErrorMessage } from "@/lib/crud/error";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { LoginInput } from "@/types/auth/login";

interface UseLoginMutationOptions {
  onSuccess?: (data: Awaited<ReturnType<typeof loginUser>>) => void;
  onError?: (error: unknown) => void;
}

export function useLoginMutation(options?: UseLoginMutationOptions) {
  const t = useTranslations("auth");

  return useMutation({
    mutationFn: (payload: LoginInput) => loginUser(payload),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      const message = getApiErrorMessage(error) ?? t("errorOccurred");
      toast.error(message);
      options?.onError?.(error);
    },
  });
}