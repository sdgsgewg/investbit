"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { AuthCard, LoginForm } from "@/components/forms/auth";

export default function LoginPage() {
  const t = useTranslations("auth");
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? ROUTES.DASHBOARD.BASE;
  const callbackError = searchParams.get("error");

  return (
    <AuthCard
      title={t("welcomeBack")}
      description={t("loginDescription")}
      footer={{
        prompt: t("dontHaveAccount"),
        href: `/register?next=${encodeURIComponent(next)}`,
        label: t("register"),
      }}
    >
      <LoginForm next={next} callbackError={callbackError} />
    </AuthCard>
  );
}
