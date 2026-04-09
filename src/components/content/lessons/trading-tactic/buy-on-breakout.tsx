import { useTranslations } from "next-intl";
import TradingTacticLessonContent from "../TradingTacticLessonContent";
import { ExampleData } from "@/app/types/learn/ExampleData";
import { IMAGES } from "@/app/constants/images";
import { mapExampleWithCharts } from "@/lib/mappers/example.mapper";

export default function BuyOnBreakout() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter5.lessons.buy_on_breakout.content",
  );

  const highlight = t.raw("highlight");

  const paragraphs: string[] = t.raw("paragraphs");

  const getExampleData = (): ExampleData => {
    const rawExample = t.raw("example");
    const charts = [[IMAGES.TRADING_TACTIC.BUY_ON_BREAKOUT.EXAMPLE]];
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
