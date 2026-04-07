import { IMAGES } from "@/app/constants/images";
import TechAnalysisContent from "@/components/content/TechAnalysisTopicContent";
import { useTranslations } from "next-intl";

export default function DescendingTriangle() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bearish.topics.descending_triangle.content",
  );

  return (
    <TechAnalysisContent
      definition={{
        image: [IMAGES.CHART_PATTERN.BEARISH.DESCENDING_TRIANGLE.DEFINITION.P1],
        sideBySideImage: [
          IMAGES.CHART_PATTERN.BEARISH.DESCENDING_TRIANGLE.DEFINITION.P2,
          IMAGES.CHART_PATTERN.BEARISH.DESCENDING_TRIANGLE.DEFINITION.P3,
        ],
        text: t.raw("definition.text"),
      }}
      example={{
        stock: t("example.stock"),
        chart: [
          IMAGES.CHART_PATTERN.BEARISH.DESCENDING_TRIANGLE.EXAMPLE,
        ],
        explanation: t.raw("example.explanation"),
      }}
    />
  );
}
