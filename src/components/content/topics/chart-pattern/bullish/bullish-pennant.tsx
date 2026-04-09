import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";
import { mapExamplesWithCharts } from "@/lib/mappers/example.mapper";
import { DefinitionData } from "@/app/types/learn/DefinitionData";
import { ExampleData } from "@/app/types/learn/ExampleData";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";

export default function BullishPennant() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bullish.topics.bullish_pennant.content",
  );

  const getDefinitionData = (): DefinitionData => {
    const rawDefinition = t.raw("definition");
    const images = [IMAGES.CHART_PATTERN.BULLISH.BULLISH_PENNANT.DEFINITION];
    return mapDefinitionWithImages(rawDefinition, {
      images,
    });
  };

  const getExamplesData = (): ExampleData[] => {
    const rawExamples = t.raw("examples");

    const charts = [[[IMAGES.CHART_PATTERN.BULLISH.BULLISH_PENNANT.EXAMPLE]]];

    return mapExamplesWithCharts(rawExamples, charts);
  };

  return (
    <TechAnalysisTopicContent
      definition={getDefinitionData()}
      examples={getExamplesData()}
    />
  );
}
