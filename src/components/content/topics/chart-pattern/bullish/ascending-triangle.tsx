import { IMAGES } from "@/app/constants/images";
import TechAnalysisContent from "@/components/content/TechAnalysisTopicContent";
import { useTranslations } from "next-intl";

export default function AscendingTriangle() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bullish.topics.ascending_triangle.content",
  );

  return (
    <TechAnalysisContent
      definition={{
        image: [IMAGES.CHART_PATTERN.BULLISH.ASCENDING_TRIANGLE.DEFINITION.P1],
        sideBySideImage: [
          IMAGES.CHART_PATTERN.BULLISH.ASCENDING_TRIANGLE.DEFINITION.P2,
          IMAGES.CHART_PATTERN.BULLISH.ASCENDING_TRIANGLE.DEFINITION.P3,
        ],
        text: t.raw("definition.text"),
      }}
      example={{
        stock: t("example.stock"),
        chart: [
          IMAGES.CHART_PATTERN.BULLISH.ASCENDING_TRIANGLE.EXAMPLE.P1,
          IMAGES.CHART_PATTERN.BULLISH.ASCENDING_TRIANGLE.EXAMPLE.P2,
        ],
        explanation: t.raw("example.explanation"),
      }}
    />
  );
}
