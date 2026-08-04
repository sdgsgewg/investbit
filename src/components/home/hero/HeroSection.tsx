"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const t = useTranslations("public.home.hero");

  return (
    <>
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 bg-linear-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl">
            {t("title")}
          </h1>

          <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
            {t("subtitle")}
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="px-8 text-lg">
              <Link href={ROUTES.LEARN}>
                {t("actions.getStarted")}
                <ArrowRight className="size-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-8 text-lg"
            >
              <Link href={ROUTES.GLOSSARY}>{t("actions.learnMore")}</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-1/4 size-96 rounded-full bg-blue-500/30 blur-3xl" />

        <div className="absolute bottom-1/4 right-1/4 size-96 rounded-full bg-cyan-500/30 blur-3xl" />
      </div>
    </>
  );
}
