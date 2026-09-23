"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { AuthCard, RegisterForm } from "@/components/forms/auth";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? ROUTES.DASHBOARD.HOME;

  return (
    <AuthCard
      title={t("createNewAccount")}
      description={t("registerDescription")}
      footer={{
        prompt: t("alreadyHaveAccount"),
        href: `/login?next=${encodeURIComponent(next)}`,
        label: t("login"),
      }}
    >
      <RegisterForm next={next} />
    </AuthCard>
  );
}
