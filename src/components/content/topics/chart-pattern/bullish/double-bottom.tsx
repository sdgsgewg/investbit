import { IMAGES } from "@/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";
import { mapExamplesWithCharts } from "@/lib/mappers/example.mapper";
import { DefinitionData } from "@/types/learn/DefinitionData";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";
import { ExampleData } from "@/types/learn/ExampleData";

export default function DoubleBottom() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter1.lessons.bullish.topics.double_bottom.content",
  );

  const getDefinitionData = (): DefinitionData => {
    const rawDefinition = t.raw("definition");
    const sideBySideImages = [
      IMAGES.CHART_PATTERN.BULLISH.DOUBLE_BOTTOM.DEFINITION.P1,
      IMAGES.CHART_PATTERN.BULLISH.DOUBLE_BOTTOM.DEFINITION.P2,
    ];
    return mapDefinitionWithImages(rawDefinition, {
      sideBySideImages,
    });
  };

  const getExamplesData = (): ExampleData[] => {
    const rawExamples = t.raw("examples");

    const charts = [[[IMAGES.CHART_PATTERN.BULLISH.DOUBLE_BOTTOM.EXAMPLE]]];

    return mapExamplesWithCharts(rawExamples, charts);
  };

  return (
    <TechAnalysisTopicContent
      definition={getDefinitionData()}
      examples={getExamplesData()}
    />
  );
}
