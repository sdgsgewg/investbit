import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";

export default function BullishPennant() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bullish.topics.bullish_pennant.content",
  );

  return (
    <TechAnalysisTopicContent
      definition={{
        image: [IMAGES.CHART_PATTERN.BULLISH.BULLISH_PENNANT.DEFINITION],
        text: t.raw("definition.text"),
      }}
      example={{
        stock: t("example.stock"),
        chart: [IMAGES.CHART_PATTERN.BULLISH.BULLISH_PENNANT.EXAMPLE],
        explanation: t.raw("example.explanation"),
      }}
    />
  );
}
