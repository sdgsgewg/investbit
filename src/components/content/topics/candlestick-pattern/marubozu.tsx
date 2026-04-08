import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../TechAnalysisTopicContent";

export default function Marubozu() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter3.lessons.candlestick_pattern.topics.marubozu.content",
  );

  return (
    <TechAnalysisTopicContent
      definition={{
        image: [IMAGES.CANDLESTICK_PATTERN.MARUBOZU.DEFINITION],
        text: t.raw("definition.text"),
      }}
    />
  );
}
