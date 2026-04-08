import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../TechAnalysisTopicContent";

export default function Doji() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter3.lessons.candlestick_pattern.topics.doji.content",
  );

  return (
    <TechAnalysisTopicContent
      definition={{
        image: [IMAGES.CANDLESTICK_PATTERN.DOJI.DEFINITION],
        text: t.raw("definition.text"),
      }}
    />
  );
}
