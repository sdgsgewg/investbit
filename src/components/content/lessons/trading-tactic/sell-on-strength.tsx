import { useTranslations } from "next-intl";
import TradingTacticLessonContent from "../TradingTacticLessonContent";

export default function SellOnStrength() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter5.lessons.sell_on_strength.content",
  );

  const highlight = t.raw("highlight");

  const paragraphs: string[] = t.raw("paragraphs");

  return (
    <TradingTacticLessonContent highlight={highlight} paragraphs={paragraphs} />
  );
}
