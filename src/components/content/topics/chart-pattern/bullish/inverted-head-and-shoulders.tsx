import { IMAGES } from "@/app/constants/images";
import TechAnalysisContent from "@/components/content/TechAnalysisTopicContent";
import { useTranslations } from "next-intl";

export default function InvertedHeadAndShoulders() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bullish.topics.inverted_head_and_shoulders.content",
  );

  return (
    <TechAnalysisContent
      definition={{
        image: [
          IMAGES.CHART_PATTERN.BULLISH.INVERTED_HEAD_AND_SHOULDERS.DEFINITION,
        ],
        text: t.raw("definition.text"),
      }}
      example={{
        stock: t("example.stock"),
        chart: [
          IMAGES.CHART_PATTERN.BULLISH.INVERTED_HEAD_AND_SHOULDERS.EXAMPLE.P1,
          IMAGES.CHART_PATTERN.BULLISH.INVERTED_HEAD_AND_SHOULDERS.EXAMPLE.P2,
        ],
        explanation: t.raw("example.explanation"),
      }}
    />
  );
}
