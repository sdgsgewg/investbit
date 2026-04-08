import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../TechAnalysisTopicContent";

export default function BullishOrBearishEngulfing() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter3.lessons.candlestick_pattern.topics.bullish_or_bearish_engulfing.content",
  );

  return (
    <TechAnalysisTopicContent
      definition={{
        image: [
          IMAGES.CANDLESTICK_PATTERN.BULLISH_OR_BEARISH_ENGULFING.DEFINITION,
        ],
        text: t.raw("definition.text"),
      }}
    />
  );
}
