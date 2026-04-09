import { useTranslations } from "next-intl";
import TechAnalysisLessonContent from "../TechAnalysisLessonContent";

export default function HowToReadVolumes() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter2.lessons.how_to_read_volumes.content",
  );

  const paragraphs: string[] = t.raw("paragraphs");

  return <TechAnalysisLessonContent paragraphs={paragraphs} />;
}
