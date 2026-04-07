import { IMAGES } from "@/app/constants/images";
import TechAnalysisContent from "@/components/content/TechAnalysisTopicContent";
import { useTranslations } from "next-intl";

export default function FallingWedge() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bullish.topics.falling_wedge.content",
  );

  return (
    <TechAnalysisContent
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
