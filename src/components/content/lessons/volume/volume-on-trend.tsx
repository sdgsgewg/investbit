import { useTranslations } from "next-intl";
import TechAnalysisLessonContent from "../TechAnalysisLessonContent";

export default function VolumeOnTrend() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter2.lessons.volume_on_trend.content",
  );

  const paragraphs: string[] = t.raw("paragraphs");

  return <TechAnalysisLessonContent paragraphs={paragraphs} />;
}
