import { useTranslations } from "next-intl";

export default function DeterminingVolumeSize() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter2.lessons.determining_volume_size.content",
  );

  return (
    <div className="space-y-6">
      <p className="prose prose-invert max-w-none">{t("p1")}</p>
      <p className="prose prose-invert max-w-none">{t("p2")}</p>
      <span className="text-primary font-semibold py-3 px-2">
        {t("highlight")}
      </span>
    </div>
  );
}
