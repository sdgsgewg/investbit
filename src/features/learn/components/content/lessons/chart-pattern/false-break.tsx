import { useTranslations } from "next-intl";
import { IMAGES } from "@/constants/images";
import ExampleSection from "../../sections/ExampleSection";
import DefinitionSection from "../../sections/DefinitionSection";
import TechAnalysisLessonContent from "../TechAnalysisLessonContent";
import { DefinitionData } from "@/features/learn/types/DefinitionData";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";
import { mapExampleWithCharts } from "@/lib/mappers/example.mapper";
import { ExampleData } from "@/features/learn/types/ExampleData";

export default function FalseBreak() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter1.lessons.false_break.content",
  );

  const getDefinitionData = (): DefinitionData => {
    const rawDefinition = t.raw("definition");
    return mapDefinitionWithImages(rawDefinition);
  };

  const getExampleData = (): ExampleData => {
    const rawExample = t.raw("example");
    const charts = [[IMAGES.CHART_PATTERN.FALSE_BREAK.EXAMPLE]];
    return mapExampleWithCharts(rawExample, charts);
  };

  return (
    <TechAnalysisLessonContent>
      <DefinitionSection definition={getDefinitionData()} />
      <ExampleSection example={getExampleData()} />
    </TechAnalysisLessonContent>
  );
}
