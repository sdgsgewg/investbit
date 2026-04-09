import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";
import { DefinitionData } from "@/app/types/learn/DefinitionData";
import { mapExamplesWithCharts } from "@/lib/mappers/example.mapper";
import { ExampleData } from "@/app/types/learn/ExampleData";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";
import { TipsData } from "@/app/types/learn/TipsData";
import { mapTips } from "@/lib/mappers/tips.mapper";

export default function RelativeStrengthIndex() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter4.lessons.leading_indicator.topics.relative_strength_index.content",
  );

  const getDefinitionData = (): DefinitionData => {
    const rawDefinition = t.raw("definition");
    return mapDefinitionWithImages(rawDefinition);
  };

  const getExamplesData = (): ExampleData[] => {
    const rawExamples = t.raw("examples");
    const charts = [[[IMAGES.INDICATOR.LEADING.RSI.EXAMPLE]]];
    return mapExamplesWithCharts(rawExamples, charts);
  };

  const getTipsData = (): TipsData => {
    const rawTips = t.raw("tips");
    return mapTips(rawTips);
  };

  return (
    <TechAnalysisTopicContent
      definition={getDefinitionData()}
      examples={getExamplesData()}
      tips={getTipsData()}
    />
  );
}
