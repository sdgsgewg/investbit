import { useTranslations } from "next-intl";
import TechAnalysisLessonContent from "../TechAnalysisLessonContent";

export default function ImportantThingsInTrends() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter2.lessons.important_things_in_trends.content",
  );

  const highlightPoints = t.raw("highlight.points");

  return (
    <TechAnalysisLessonContent
      highlight={{ points: highlightPoints, pointsType: "bullet" }}
    />
  );
}
