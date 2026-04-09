import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";
import { mapExamplesWithCharts } from "@/lib/mappers/example.mapper";
import { DefinitionData } from "@/app/types/learn/DefinitionData";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";
import { ExampleData } from "@/app/types/learn/ExampleData";

export default function FallingWedge() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bullish.topics.falling_wedge.content",
  );

  const getDefinitionData = (): DefinitionData => {
    const rawDefinition = t.raw("definition");
    const sideBySideImages = [
      IMAGES.CHART_PATTERN.BULLISH.FALLING_WEDGE.DEFINITION.P1,
      IMAGES.CHART_PATTERN.BULLISH.FALLING_WEDGE.DEFINITION.P2,
    ];
    return mapDefinitionWithImages(rawDefinition, {
      sideBySideImages,
    });
  };

  const getExamplesData = (): ExampleData[] => {
    const rawExamples = t.raw("examples");

    const charts = [[[IMAGES.CHART_PATTERN.BULLISH.FALLING_WEDGE.EXAMPLE]]];

    return mapExamplesWithCharts(rawExamples, charts);
  };

  return (
    <TechAnalysisTopicContent
      definition={getDefinitionData()}
      examples={getExamplesData()}
    />
  );
}
