import { IMAGES } from "@/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";
import { DefinitionData } from "@/features/learn/types/DefinitionData";
import { mapExamplesWithCharts } from "@/lib/mappers/example.mapper";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";
import { FunctionData } from "@/features/learn/types/FunctionData";
import { mapFunction } from "@/lib/mappers/function.mapper";
import { mapListWithImages } from "@/lib/mappers/list.mapper";
import { ListData } from "@/features/learn/types/ListData";
import { ConclusionData } from "@/features/learn/types/ConclusionData";
import { mapConclusion } from "@/lib/mappers/conclusion.mapper";
import ListSection from "../../../sections/ListSection";
import { ExampleData } from "@/features/learn/types/ExampleData";

export default function BollingerBands() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter4.lessons.lagging_indicator.topics.bollinger_bands.content",
  );

  const getListData = (): ListData => {
    const rawList = t.raw("list");
    return mapListWithImages(rawList);
  };

  const getDefinitionData = (): DefinitionData => {
    const rawDefinition = t.raw("definition");
    const children = <ListSection list={getListData()} />;
    return mapDefinitionWithImages(rawDefinition, { children });
  };

  const getFunctionData = (): FunctionData => {
    const rawFunction = t.raw("function");
    return mapFunction(rawFunction);
  };

  const getExamplesData = (): ExampleData[] => {
    const rawExamples = t.raw("examples");
    const charts = [[[IMAGES.INDICATOR.LAGGING.BOLLINGER_BANDS.EXAMPLE]]];
    return mapExamplesWithCharts(rawExamples, charts);
  };

  const getConclusionData = (): ConclusionData => {
    const rawConclusion = t.raw("conclusion");
    return mapConclusion(rawConclusion);
  };

  return (
    <TechAnalysisTopicContent
      definition={getDefinitionData()}
      functionData={getFunctionData()}
      examples={getExamplesData()}
      conclusion={getConclusionData()}
    />
  );
}
