import { useTranslations } from "next-intl";
import TechAnalysisLessonContent from "../TechAnalysisLessonContent";

export default function DeterminingVolumeSize() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter2.lessons.determining_volume_size.content",
  );

  const paragraphs: string[] = t.raw("paragraphs");
  const highlight = t.raw("highlight");

  return (
    // <div className="space-y-6">
    //   <p className="prose prose-invert max-w-none">{t("p1")}</p>
    //   <p className="prose prose-invert max-w-none">{t("p2")}</p>
    //   <span className="text-primary font-semibold py-3 px-2">
    //     {t("highlight")}
    //   </span>
    // </div>

    <TechAnalysisLessonContent paragraphs={paragraphs} highlight={highlight} />
  );
}
