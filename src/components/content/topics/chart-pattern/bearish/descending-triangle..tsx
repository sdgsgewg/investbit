import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";
import { mapExamplesWithCharts } from "@/lib/mappers/example.mapper";
import { DefinitionData } from "@/app/types/learn/DefinitionData";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";
import { ExampleData } from "@/app/types/learn/ExampleData";

export default function DescendingTriangle() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bearish.topics.descending_triangle.content",
  );

  const getDefinitionData = (): DefinitionData => {
    const rawDefinition = t.raw("definition");
    const images = [
        IMAGES.CHART_PATTERN.BEARISH.DESCENDING_TRIANGLE.DEFINITION.P1,
      ],
      sideBySideImages = [
        IMAGES.CHART_PATTERN.BEARISH.DESCENDING_TRIANGLE.DEFINITION.P2,
        IMAGES.CHART_PATTERN.BEARISH.DESCENDING_TRIANGLE.DEFINITION.P3,
      ];
    return mapDefinitionWithImages(rawDefinition, {
      images,
      sideBySideImages,
    });
  };

  const getExamplesData = (): ExampleData[] => {
    const rawExamples = t.raw("examples");

    const charts = [
      [[IMAGES.CHART_PATTERN.BEARISH.DESCENDING_TRIANGLE.EXAMPLE]],
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
