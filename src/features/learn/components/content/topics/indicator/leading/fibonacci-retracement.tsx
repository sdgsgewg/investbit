import { IMAGES } from "@/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";
import { mapExamplesWithCharts } from "@/lib/mappers/example.mapper";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";
import { DefinitionData } from "@/features/learn/types/DefinitionData";
import { ExampleData } from "@/features/learn/types/ExampleData";

export default function FibonacciRetracement() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter4.lessons.leading_indicator.topics.fibonacci_retracement.content",
  );

  const getDefinitionData = (): DefinitionData => {
    const rawDefinition = t.raw("definition");
    return mapDefinitionWithImages(rawDefinition);
  };

  const getExamplesData = (): ExampleData[] => {
    const rawExamples = t.raw("examples");

    const charts = [
      [[IMAGES.INDICATOR.LEADING.FIBONACCI_RETRACEMENT.EXAMPLE.P_1_1]],
      [
        [IMAGES.INDICATOR.LEADING.FIBONACCI_RETRACEMENT.EXAMPLE.P_2_1],
        [IMAGES.INDICATOR.LEADING.FIBONACCI_RETRACEMENT.EXAMPLE.P_2_2],
      ],
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
