"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { AlertCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmailField, PasswordField } from "../fields";
import { useLoginForm, useLoginMutation } from "@/hooks/auth/login";
import { useCrudFormState } from "@/hooks/crud";
import { toast } from "sonner";
import { LoginInput } from "@/types/auth/login";
import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

interface LoginFormProps {
  next?: string;
  callbackError?: string | null;
}

export default function LoginForm({
  next = "/",
  callbackError,
}: LoginFormProps) {
  const t = useTranslations("auth");
  const router = useRouter();
  const supabase = createClient();

  const [isCallbackDismissed, setIsCallbackDismissed] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const displayError =
    formError ??
    (!isCallbackDismissed && callbackError
      ? callbackError === "auth-callback-failed"
        ? t("authCallbackFailed")
        : t("errorOccurred")
      : null);

  const loginMutation = useLoginMutation({
    onSuccess: async (data) => {
      await supabase.auth.setSession(data.session);
      toast.success(t("loginSuccess"));
      router.push(next);
      router.refresh();
    },
  });

  const handleSubmit = (payload: LoginInput) => {
    setIsCallbackDismissed(true);
    setFormError(null);
    loginMutation.mutate({
      ...payload,
    });
  };

  const form = useLoginForm({
    onSubmit: handleSubmit,
  });

  const { canSubmit } = useCrudFormState({ form });

  const isSubmitting = loginMutation.isPending;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      {/* Callback / Auth Error Message */}
      {displayError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{displayError}</span>
        </motion.div>
      )}

      {/* Email */}
      <form.Field name="email">
        {(field) => (
          <EmailField
            field={field}
            label={t("email")}
            placeholder="name@example.com"
            disabled={isSubmitting}
            required
          />
        )}
      </form.Field>

      {/* Password */}
      <form.Field name="password">
        {(field) => (
          <PasswordField
            field={field}
            label={t("password")}
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isSubmitting}
            required
          />
        )}
      </form.Field>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!canSubmit || isSubmitting}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-indigo-600 py-6 font-semibold text-white shadow-lg shadow-primary/10 transition-all hover:from-primary/95 hover:to-indigo-600/95"
      >
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            {t("signingIn")}
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4" />
            {t("login")}
          </>
        )}
      </Button>
    </form>
  );
}
