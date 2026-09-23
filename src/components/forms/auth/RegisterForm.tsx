"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmailField, PasswordField, TextField } from "../fields";
import { useRegisterForm, useRegisterMutation } from "@/hooks/auth/register";
import { useCrudFormState } from "@/hooks/crud";
import { toast } from "sonner";
import { RegisterInput } from "@/types/auth/register";

interface RegisterFormProps {
  locale: string;
  next: string;
}

export default function RegisterForm({ locale, next }: RegisterFormProps) {
  const t = useTranslations("auth");

  const tCommonLabels = useTranslations("common.form.labels");
  const tCommonPlaceholders = useTranslations("common.form.placeholders");

  const router = useRouter();

  const registerMutation = useRegisterMutation({
    onSuccess: (data) => {
      if (data.hasSession) {
        toast.success(t("loginSuccess"));
        router.push(next);
        router.refresh();
      } else {
        toast.success(t("registerSuccess"), {
          duration: 6000,
        });
        form.reset();
      }
    },
  });

  const handleSubmit = (payload: RegisterInput) => {
    registerMutation.mutate({
      ...payload,
      locale,
      next,
    });
  };

  const form = useRegisterForm({
    onSubmit: handleSubmit,
  });

  const { canSubmit } = useCrudFormState({ form });

  const isSubmitting = registerMutation.isPending;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      {/* Name */}
      <form.Field name="name">
        {(field) => (
          <TextField
            field={field}
            label={tCommonLabels("name")}
            icon={User}
            placeholder={tCommonPlaceholders("name")}
            disabled={isSubmitting}
            inputClassName="pl-10"
            required
          />
        )}
      </form.Field>

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

      {/* Confirm Password */}
      <form.Field name="password_confirmation">
        {(field) => (
          <PasswordField
            field={field}
            label={t("confirmPassword")}
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
            {t("signingUp")}
          </>
        ) : (
          <>
            <UserPlus className="h-4 w-4" />
            {t("register")}
          </>
        )}
      </Button>
    </form>
  );
}
