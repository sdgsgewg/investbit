import { IMAGES } from "@/app/constants/images";
import TechAnalysisContent from "@/components/content/TechAnalysisTopicContent";
import { useTranslations } from "next-intl";

export default function DoubleBottom() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bullish.topics.double_bottom.content",
  );

  return (
    <TechAnalysisContent
      definition={{
        sideBySideImage: [
          IMAGES.CHART_PATTERN.BULLISH.DOUBLE_BOTTOM.DEFINITION.P1,
          IMAGES.CHART_PATTERN.BULLISH.DOUBLE_BOTTOM.DEFINITION.P2,
        ],
        text: t.raw("definition.text"),
      }}
      example={{
        stock: t("example.stock"),
        chart: [IMAGES.CHART_PATTERN.BULLISH.DOUBLE_BOTTOM.EXAMPLE],
        explanation: t.raw("example.explanation"),
      }}
    />
  );
}
