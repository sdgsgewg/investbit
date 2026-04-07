import { IMAGES } from "@/app/constants/images";
import TechAnalysisContent from "@/components/content/TechAnalysisTopicContent";
import { useTranslations } from "next-intl";

export default function Rectangle() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.sideways.topics.rectangle.content",
  );

  return (
    <TechAnalysisContent
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
