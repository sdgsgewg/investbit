import { useTranslations } from "next-intl";

export default function VolumeOnTrend() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter2.lessons.volume_on_trend.content",
  );

  return (
    <div className="space-y-6">
      <p className="prose prose-invert max-w-none">{t("p1")}</p>
      <p className="prose prose-invert max-w-none">{t("p2")}</p>
      <p className="prose prose-invert max-w-none">{t("p3")}</p>
      <p className="prose prose-invert max-w-none">{t("p4")}</p>
      <p className="prose prose-invert max-w-none">{t("p5")}</p>
      <p className="prose prose-invert max-w-none">{t("p6")}</p>
      <p className="prose prose-invert max-w-none">{t("p7")}</p>
    </div>
  );
}
