import { IMAGES } from "@/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../TechAnalysisTopicContent";
import { DefinitionData } from "@/types/learn/DefinitionData";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";

export default function MorningStar() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter3.lessons.candlestick_pattern.topics.morning_star.content",
  );

  const getDefinitionData = (): DefinitionData => {
    const rawDefinition = t.raw("definition");
    const images = [IMAGES.CANDLESTICK_PATTERN.MORNING_STAR.DEFINITION];
    return mapDefinitionWithImages(rawDefinition, {
      images,
    });
  };

  return <TechAnalysisTopicContent definition={getDefinitionData()} />;
}
