import { useTranslations } from "next-intl";
import TechAnalysisLessonContent from "../TechAnalysisLessonContent";

export default function Introduction() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter4.lessons.introduction.content",
  );

  const paragraphs: string[] = t.raw("paragraphs");

  return <TechAnalysisLessonContent paragraphs={paragraphs} />;
}
