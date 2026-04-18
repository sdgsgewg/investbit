import { IMAGES } from "@/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";
import { mapExamplesWithCharts } from "@/lib/mappers/example.mapper";
import { DefinitionData } from "@/features/learn/types/DefinitionData";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";
import { ExampleData } from "@/features/learn/types/ExampleData";

export default function AscendingTriangle() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter1.lessons.bullish.topics.ascending_triangle.content",
  );

  const getDefinitionData = (): DefinitionData => {
    const rawDefinition = t.raw("definition");
    const images = [
      IMAGES.CHART_PATTERN.BULLISH.ASCENDING_TRIANGLE.DEFINITION.P1,
    ];
    const sideBySideImages = [
      IMAGES.CHART_PATTERN.BULLISH.ASCENDING_TRIANGLE.DEFINITION.P2,
      IMAGES.CHART_PATTERN.BULLISH.ASCENDING_TRIANGLE.DEFINITION.P3,
    ];
    return mapDefinitionWithImages(rawDefinition, {
      images,
      sideBySideImages,
    });
  };

  const getExamplesData = (): ExampleData[] => {
    const rawExamples = t.raw("examples");

    const charts = [
      [
        [
          IMAGES.CHART_PATTERN.BULLISH.ASCENDING_TRIANGLE.EXAMPLE.P1,
          IMAGES.CHART_PATTERN.BULLISH.ASCENDING_TRIANGLE.EXAMPLE.P2,
        ],
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
