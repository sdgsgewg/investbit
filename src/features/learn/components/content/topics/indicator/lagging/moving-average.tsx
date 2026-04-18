import { IMAGES } from "@/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";
import { DefinitionData } from "@/features/learn/types/DefinitionData";
import { mapExamplesWithCharts } from "@/lib/mappers/example.mapper";
import { mapTutorialWithChart } from "@/lib/mappers/tutorial.mapper";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";
import { FunctionData } from "@/features/learn/types/FunctionData";
import { mapFunction } from "@/lib/mappers/function.mapper";
import { TutorialData } from "@/features/learn/types/TutorialData";
import { ExampleData } from "@/features/learn/types/ExampleData";

export default function MovingAverage() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter4.lessons.lagging_indicator.topics.moving_average.content",
  );

  const getDefinitionData = (): DefinitionData => {
    const rawDefinition = t.raw("definition");
    return mapDefinitionWithImages(rawDefinition);
  };

  const getTutorialData = (): TutorialData => {
    const rawTutorial = t.raw("tutorial");
    const chart = IMAGES.INDICATOR.LAGGING.MA.TUTORIAL;
    return mapTutorialWithChart(rawTutorial, chart);
  };

  const getFunctionData = (): FunctionData => {
    const rawFunction = t.raw("function");
    return mapFunction(rawFunction);
  };

  const getExamplesData = (): ExampleData[] => {
    const rawExamples = t.raw("examples");

    const charts = [
      [[IMAGES.INDICATOR.LAGGING.MA.EXAMPLE.P_1_1]],
      [
        [IMAGES.INDICATOR.LAGGING.MA.EXAMPLE.P_2_1],
        [IMAGES.INDICATOR.LAGGING.MA.EXAMPLE.P_2_2],
      ],
    ];

    return mapExamplesWithCharts(rawExamples, charts);
  };

  return (
    <TechAnalysisTopicContent
      definition={getDefinitionData()}
      tutorial={getTutorialData()}
      functionData={getFunctionData()}
      examples={getExamplesData()}
    />
  );
}
