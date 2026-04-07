import { useTranslations } from "next-intl";

export default function HowToReadVolumes() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter2.lessons.how_to_read_volumes.content",
  );

  return (
    <div className="space-y-6">
      <p className="prose prose-invert max-w-none">{t("p1")}</p>
      <p className="prose prose-invert max-w-none">{t("p2")}</p>
    </div>
  );
}
