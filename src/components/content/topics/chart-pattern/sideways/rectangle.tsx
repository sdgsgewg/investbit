import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";

export default function Rectangle() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.sideways.topics.rectangle.content",
  );

  return (
    <TechAnalysisTopicContent
      definition={{
        text: t.raw("definition.text"),
      }}
      example={{
        stock: t("example.stock"),
        chart: [IMAGES.CHART_PATTERN.SIDEWAYS.RECTANGLE.EXAMPLE],
        explanation: t.raw("example.explanation"),
      }}
    />
  );
}
