"use client";

import { useTranslations } from "next-intl";

export default function VolumeOnChartPattern() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter2.lessons.volume_on_chart_pattern.content",
  );

  const explanation = t.raw("example.explanation") as string[];
  const listPoints = t.raw("list.points") as string[];

  return (
    <div className="space-y-8">
      {/* Intro */}
      <p className="prose prose-invert max-w-none text-base leading-relaxed">
        {t("p1")}
      </p>

      {/* Example Section */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
        <h3 className="text-lg font-semibold">{t("example.title")}</h3>

        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          {explanation.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Explanation */}
      <p className="prose prose-invert max-w-none">{t("p2")}</p>
      <p className="prose prose-invert max-w-none">{t("p3")}</p>

      {/* Key Points */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">{t("list.title")}</h3>

        <ul className="list-disc pl-5 space-y-2">
          {listPoints.map((point, i) => (
            <li key={i} className="text-muted-foreground">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
