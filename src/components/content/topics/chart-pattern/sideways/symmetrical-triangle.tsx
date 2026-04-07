import { IMAGES } from "@/app/constants/images";
import TechAnalysisContent from "@/components/content/TechAnalysisTopicContent";
import { useTranslations } from "next-intl";

export default function SymmetricalTriangle() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.sideways.topics.symmetrical_triangle.content",
  );

  return (
    <TechAnalysisContent
      definition={{
        image: [IMAGES.CHART_PATTERN.SIDEWAYS.SYMMETRICAL_TRIANGLE.DEFINITION],
        text: t.raw("definition.text"),
      }}
      example={{
        stock: t("example.stock"),
        chart: [
          IMAGES.CHART_PATTERN.SIDEWAYS.SYMMETRICAL_TRIANGLE.EXAMPLE.P1,
          IMAGES.CHART_PATTERN.SIDEWAYS.SYMMETRICAL_TRIANGLE.EXAMPLE.P2,
        ],
        explanation: t.raw("example.explanation"),
      }}
    />
  );
}
