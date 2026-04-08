import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";

export default function FallingWedge() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bullish.topics.falling_wedge.content",
  );

  return (
    <TechAnalysisTopicContent
      definition={{
        sideBySideImage: [
          IMAGES.CHART_PATTERN.BULLISH.FALLING_WEDGE.DEFINITION.P1,
          IMAGES.CHART_PATTERN.BULLISH.FALLING_WEDGE.DEFINITION.P2,
        ],
        text: t.raw("definition.text"),
      }}
      example={{
        stock: t("example.stock"),
        chart: [IMAGES.CHART_PATTERN.BULLISH.FALLING_WEDGE.EXAMPLE],
        explanation: t.raw("example.explanation"),
      }}
    />
  );
}
