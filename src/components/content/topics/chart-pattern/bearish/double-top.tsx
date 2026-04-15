import { IMAGES } from "@/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";
import { mapExamplesWithCharts } from "@/lib/mappers/example.mapper";
import { DefinitionData } from "@/types/learn/DefinitionData";
import { ExampleData } from "@/types/learn/ExampleData";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";

export default function DoubleTop() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter1.lessons.bearish.topics.double_top.content",
  );

  const getDefinitionData = (): DefinitionData => {
    const rawDefinition = t.raw("definition");
    const sideBySideImages = [
      IMAGES.CHART_PATTERN.BEARISH.DOUBLE_TOP.DEFINITION.P1,
      IMAGES.CHART_PATTERN.BEARISH.DOUBLE_TOP.DEFINITION.P2,
    ];
    return mapDefinitionWithImages(rawDefinition, {
      sideBySideImages,
    });
  };

  const getExamplesData = (): ExampleData[] => {
    const rawExamples = t.raw("examples");

    const charts = [[[IMAGES.CHART_PATTERN.BEARISH.DOUBLE_TOP.EXAMPLE]]];

    return mapExamplesWithCharts(rawExamples, charts);
  };

  return (
    <TechAnalysisTopicContent
      definition={getDefinitionData()}
      examples={getExamplesData()}
    />
  );
}
