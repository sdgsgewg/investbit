import { useTranslations } from "next-intl";
import TechAnalysisLessonContent from "../TechAnalysisLessonContent";

export default function VolumeIndicators() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter2.lessons.volume_indicators.content",
  );

  const paragraphs: string[] = t.raw("paragraphs");

  return <TechAnalysisLessonContent paragraphs={paragraphs} />;
}
