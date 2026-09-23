"use client";

import { useMutation } from "@tanstack/react-query";
import { registerUser, RegisterPayload } from "@/lib/api/auth/register";
import { getApiErrorMessage } from "@/lib/crud/error";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface UseRegisterMutationOptions {
  onSuccess?: (data: Awaited<ReturnType<typeof registerUser>>) => void;
  onError?: (error: unknown) => void;
}

export function useRegisterMutation(options?: UseRegisterMutationOptions) {
  const t = useTranslations("auth");

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
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
