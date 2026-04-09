import { useTranslations } from "next-intl";
import TechAnalysisLessonContent from "../TechAnalysisLessonContent";

export default function KeyTakeawaysC1() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.key_takeaways_c1.content",
  );

  const paragraphs: string[] = t.raw("paragraphs");

  return <TechAnalysisLessonContent paragraphs={paragraphs} />;
}
