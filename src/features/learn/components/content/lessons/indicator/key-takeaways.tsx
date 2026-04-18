import { useTranslations } from "next-intl";
import TechAnalysisLessonContent from "../TechAnalysisLessonContent";

export default function KeyTakeawaysC4() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter4.lessons.key_takeaways_c4.content",
  );

  const paragraphs: string[] = t.raw("paragraphs");

  return <TechAnalysisLessonContent paragraphs={paragraphs} />;
}
