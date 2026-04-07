import { useTranslations } from "next-intl";

export default function VolumeAtBreakoutBreakdown() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter2.lessons.volume_at_breakout_breakdown.content",
  );

  return (
    <div className="space-y-6">
      <p className="prose prose-invert max-w-none">{t("p1")}</p>
      <p className="prose prose-invert max-w-none">{t("p2")}</p>
      <p className="prose prose-invert max-w-none">{t("p3")}</p>
      <p className="prose prose-invert max-w-none">{t("p4")}</p>
    </div>
  );
}
