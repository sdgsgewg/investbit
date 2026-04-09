import { useTranslations } from "next-intl";
import TechAnalysisLessonContent from "../TechAnalysisLessonContent";
import ContentParagraph from "../../ContentParagraph";
import HighlightSection from "../../sections/HighlightSection";

export default function KeyTakeawaysC5() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter5.lessons.key_takeaways_c5.content",
  );

  const highlight = t.raw("highlight");

  return (
    <TechAnalysisLessonContent>
      <ContentParagraph text={t("p1")} />
      <HighlightSection highlight={highlight} />
      <ContentParagraph text={t("p2")} />
    </TechAnalysisLessonContent>
  );
}
