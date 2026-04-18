import { useTranslations } from "next-intl";
import TradingTacticLessonContent from "../TradingTacticLessonContent";
import { IMAGES } from "@/constants/images";
import { mapExampleWithCharts } from "@/lib/mappers/example.mapper";
import { ExampleData } from "@/features/learn/types/ExampleData";

export default function BuyOnWeakness() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter5.lessons.buy_on_weakness.content",
  );

  const highlight = t.raw("highlight");

  const paragraphs: string[] = t.raw("paragraphs");

  const getExampleData = (): ExampleData => {
    const rawExample = t.raw("example");
    const charts = [[IMAGES.TRADING_TACTIC.BUY_ON_WEAKNESS.EXAMPLE]];
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
