import { IMAGES } from "@/app/constants/images";
import TechAnalysisContent from "@/components/content/TechAnalysisTopicContent";
import { useTranslations } from "next-intl";

export default function BullishFlag() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bullish.topics.bullish_flag.content",
  );

  return (
    <TechAnalysisContent
      definition={{
        image: [IMAGES.CHART_PATTERN.BULLISH.BULLISH_FLAG.DEFINITION],
        text: t.raw("definition.text"),
      }}
      example={{
        stock: t("example.stock"),
        chart: [IMAGES.CHART_PATTERN.BULLISH.BULLISH_FLAG.EXAMPLE],
        explanation: t.raw("example.explanation"),
      }}
    />
  );
}
