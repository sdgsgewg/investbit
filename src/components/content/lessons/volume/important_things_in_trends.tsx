import { useTranslations } from "next-intl";

export default function ImportantThingsInTrends() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter2.lessons.important_things_in_trends.content",
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
