import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";
import { mapExamplesWithCharts } from "@/lib/mappers/example.mapper";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";
import { DefinitionData } from "@/app/types/learn/DefinitionData";
import { ExampleData } from "@/app/types/learn/ExampleData";

export default function SymmetricalTriangle() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter1.lessons.sideways.topics.symmetrical_triangle.content",
  );

  const getDefinitionData = (): DefinitionData => {
    const rawDefinition = t.raw("definition");
    const images = [
      IMAGES.CHART_PATTERN.SIDEWAYS.SYMMETRICAL_TRIANGLE.DEFINITION,
    ];
    return mapDefinitionWithImages(rawDefinition, {
      images,
    });
  };

  const getExamplesData = (): ExampleData[] => {
    const rawExamples = t.raw("examples");

    const charts = [
      [
        [
          IMAGES.CHART_PATTERN.SIDEWAYS.SYMMETRICAL_TRIANGLE.EXAMPLE.P1,
          IMAGES.CHART_PATTERN.SIDEWAYS.SYMMETRICAL_TRIANGLE.EXAMPLE.P2,
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
