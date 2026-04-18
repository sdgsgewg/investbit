import { useTranslations } from "next-intl";
import TradingTacticLessonContent from "../TradingTacticLessonContent";
import { IMAGES } from "@/constants/images";
import { mapExampleWithCharts } from "@/lib/mappers/example.mapper";
import { ExampleData } from "@/features/learn/types/ExampleData";

export default function SellOnBreakdown() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter5.lessons.sell_on_breakdown.content",
  );

  const highlight = t.raw("highlight");

  const paragraphs: string[] = t.raw("paragraphs");

  const getExampleData = (): ExampleData => {
    const rawExample = t.raw("example");
    const charts = [[IMAGES.TRADING_TACTIC.SELL_ON_BREAKDOWN.EXAMPLE]];
    return mapExampleWithCharts(rawExample, charts);
  };

  return (
    <TradingTacticLessonContent
      highlight={highlight}
      paragraphs={paragraphs}
      example={getExampleData()}
    />
  );
}
