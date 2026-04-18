import { useTranslations } from "next-intl";
import TechAnalysisLessonContent from "../TechAnalysisLessonContent";

export default function KeyTakeawaysC3() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter3.lessons.key_takeaways_c3.content",
  );

  const paragraphs: string[] = t.raw("paragraphs");

  return <TechAnalysisLessonContent paragraphs={paragraphs} />;
}
