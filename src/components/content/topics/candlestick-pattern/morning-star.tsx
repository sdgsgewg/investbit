import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../TechAnalysisTopicContent";

export default function MorningStar() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter3.lessons.candlestick_pattern.topics.morning_star.content",
  );

  return (
    <TechAnalysisTopicContent
      definition={{
        image: [IMAGES.CANDLESTICK_PATTERN.MORNING_STAR.DEFINITION],
        text: t.raw("definition.text"),
      }}
    />
  );
}
