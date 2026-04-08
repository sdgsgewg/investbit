import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../TechAnalysisTopicContent";

export default function InvertedHammer() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter3.lessons.candlestick_pattern.topics.inverted_hammer.content",
  );

  return (
    <TechAnalysisTopicContent
      definition={{
        image: [IMAGES.CANDLESTICK_PATTERN.INVERTED_HAMMER.DEFINITION],
        text: t.raw("definition.text"),
      }}
    />
  );
}
