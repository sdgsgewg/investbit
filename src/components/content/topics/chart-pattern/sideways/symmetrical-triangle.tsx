import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";

export default function SymmetricalTriangle() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.sideways.topics.symmetrical_triangle.content",
  );

  return (
    <TechAnalysisTopicContent
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
