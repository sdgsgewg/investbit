import { IMAGES } from "@/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";
import { mapExamplesWithCharts } from "@/lib/mappers/example.mapper";
import { DefinitionData } from "@/types/learn/DefinitionData";
import { ExampleData } from "@/types/learn/ExampleData";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";

export default function HeadAndShoulders() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter1.lessons.bearish.topics.head_and_shoulders.content",
  );

  const getDefinitionData = (): DefinitionData => {
    const rawDefinition = t.raw("definition");
    const sideBySideImages = [
      IMAGES.CHART_PATTERN.BEARISH.HEAD_AND_SHOULDERS.DEFINITION.P1,
      IMAGES.CHART_PATTERN.BEARISH.HEAD_AND_SHOULDERS.DEFINITION.P2,
    ];
    return mapDefinitionWithImages(rawDefinition, {
      sideBySideImages,
    });
  };

  const getExamplesData = (): ExampleData[] => {
    const rawExamples = t.raw("examples");

    const charts = [
      [[IMAGES.CHART_PATTERN.BEARISH.HEAD_AND_SHOULDERS.EXAMPLE]],
    ];

    return mapExamplesWithCharts(rawExamples, charts);
  };

  return (
    <TechAnalysisTopicContent
      definition={getDefinitionData()}
      examples={getExamplesData()}
    />
  );
}
