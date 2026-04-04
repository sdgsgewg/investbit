"use client";

import { useTranslations, useLocale } from "next-intl";
import { HOME_FEATURES } from "@/lib/home-data";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { ArrowRight, BarChart2, BookOpen, BrainCircuit } from "lucide-react";

const ICON_MAP = {
  feature1: BookOpen,
  feature2: BarChart2,
  feature3: BrainCircuit,
};

export default function LandingPage() {
  const t = useTranslations("HomePage");
  const locale = useLocale();

  const features =
    HOME_FEATURES[locale as keyof typeof HOME_FEATURES] || HOME_FEATURES.en;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-linear-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {t("title")}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              {t("subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/reksadana">
                  {t("getStarted")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8"
              >
                <Link href="/learn">{t("learnMore")}</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl mix-blend-screen animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl mix-blend-screen animate-pulse delay-1000" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = ICON_MAP[feature.key];

              return (
                <div
                  key={feature.key}
                  className="bg-background p-8 rounded-2xl shadow-xs border hover:shadow-md transition-shadow"
                >
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
