import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../TechAnalysisTopicContent";
import { DefinitionData } from "@/app/types/learn/DefinitionData";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";

export default function BullishOrBearishEngulfing() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter3.lessons.candlestick_pattern.topics.bullish_or_bearish_engulfing.content",
  );

  const getDefinitionData = (): DefinitionData => {
    const rawDefinition = t.raw("definition");
    const images = [
      IMAGES.CANDLESTICK_PATTERN.BULLISH_OR_BEARISH_ENGULFING.DEFINITION,
    ];
    return mapDefinitionWithImages(rawDefinition, {
      images,
    });
  };

  return <TechAnalysisTopicContent definition={getDefinitionData()} />;
}
