import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";

export default function DoubleBottom() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bullish.topics.double_bottom.content",
  );

  return (
    <TechAnalysisTopicContent
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
