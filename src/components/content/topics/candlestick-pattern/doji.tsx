import { IMAGES } from "@/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../TechAnalysisTopicContent";
import { DefinitionData } from "@/types/learn/DefinitionData";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";

export default function Doji() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter3.lessons.candlestick_pattern.topics.doji.content",
  );

  const getDefinitionData = (): DefinitionData => {
    const rawDefinition = t.raw("definition");
    const images = [IMAGES.CANDLESTICK_PATTERN.DOJI.DEFINITION];
    return mapDefinitionWithImages(rawDefinition, {
      images,
    });
  };

  return <TechAnalysisTopicContent definition={getDefinitionData()} />;
}
