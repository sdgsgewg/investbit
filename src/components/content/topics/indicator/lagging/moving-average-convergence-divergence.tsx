import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";
import DefinitionSection from "@/components/content/sections/DefinitionSection";
import { DefinitionData } from "@/types/learn/DefinitionData";
import ContentParagraph from "@/components/content/ContentParagraph";
import ImageWrapper from "@/components/shared/ImageWrapper";
import { IMAGES } from "@/constants/images";
import ListSection from "@/components/content/sections/ListSection";
import { ListData } from "@/types/learn/ListData";
import ImageSection from "@/components/content/sections/ImageSection";
import { ImageData } from "@/types/learn/ImageData";
import ExampleSection from "@/components/content/sections/ExampleSection";
import { ExampleData } from "@/types/learn/ExampleData";
import { mapExampleWithCharts } from "@/lib/mappers/example.mapper";
import { mapDefinitionWithImages } from "@/lib/mappers/definition.mapper";

export default function MovingAverageConvergenceDivergence() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter4.lessons.lagging_indicator.topics.moving_average_convergence_divergence.content",
  );

  const macdDefinitionData: DefinitionData = {
    title: t("definition.title"),
  };
  const macdDefinitionListData: ListData = t.raw("definition.list");
  const macdDefinitionUptrendData: ImageData = {
    text: t("definition.p2"),
    image: IMAGES.INDICATOR.LAGGING.MACD.DEFINITION.UPTREND,
  };
  const macdDefinitionDowntrendData: ImageData = {
    text: t("definition.p3"),
    image: IMAGES.INDICATOR.LAGGING.MACD.DEFINITION.DOWNTREND,
  };

  const getMacdExampleData = (): ExampleData => {
    const rawExample = t.raw("example");
    const charts = [
      [IMAGES.INDICATOR.LAGGING.MACD.EXAMPLE.BUY_SIGNAL],
      [IMAGES.INDICATOR.LAGGING.MACD.EXAMPLE.SELL_SIGNAL],
    ];
    return mapExampleWithCharts(rawExample, charts);
  };

  const getMacdDivergenceDefinitionData = (): DefinitionData => {
    const rawMacdDivergenceDefinition = t.raw("definition_macd_divergence");
    return mapDefinitionWithImages(rawMacdDivergenceDefinition);
  };

  const getMacdBearishDivergenceExampleData = (): ExampleData => {
    const rawExample = t.raw("example_macd_bearish_divergence");
    const charts = [
      [IMAGES.INDICATOR.LAGGING.MACD.MACD_BEARISH_DIVERGENCE.EXAMPLE],
    ];
    return mapExampleWithCharts(rawExample, charts);
  };

  const getMacdBullishDivergenceDefinitionData = (): DefinitionData => {
    const rawMacdBullishDivergenceDefinition = t.raw(
      "definition_macd_bullish_divergence",
    );
    return mapDefinitionWithImages(rawMacdBullishDivergenceDefinition);
  };

  const getMacdBullishDivergenceExampleData = (): ExampleData => {
    const rawExample = t.raw("example_macd_bullish_divergence");
    const charts = [
      [IMAGES.INDICATOR.LAGGING.MACD.MACD_BULLISH_DIVERGENCE.EXAMPLE],
    ];
    return mapExampleWithCharts(rawExample, charts);
  };

  return (
    <TechAnalysisTopicContent>
      <DefinitionSection definition={macdDefinitionData}>
        <ContentParagraph text={t("definition.p1")} />
        <ImageWrapper
          src={IMAGES.INDICATOR.LAGGING.MACD.DEFINITION.BASE}
          alt="MACD"
        />
        <ListSection list={macdDefinitionListData} />
        <ImageSection data={macdDefinitionUptrendData} />
        <ImageSection data={macdDefinitionDowntrendData} />
      </DefinitionSection>

      <ExampleSection example={getMacdExampleData()} />

      <ContentParagraph text={t("connecting_text_1")} />

      <DefinitionSection definition={getMacdDivergenceDefinitionData()} />

      <ExampleSection example={getMacdBearishDivergenceExampleData()} />

      <ContentParagraph text={t("connecting_text_2")} />

      <DefinitionSection
        definition={getMacdBullishDivergenceDefinitionData()}
      />

      <ExampleSection example={getMacdBullishDivergenceExampleData()} />
    </TechAnalysisTopicContent>
  );
}
