import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";

export default function HeadAndShoulders() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bearish.topics.head_and_shoulders.content",
  );

  return (
    <TechAnalysisTopicContent
      definition={{
        sideBySideImage: [
          IMAGES.CHART_PATTERN.BEARISH.HEAD_AND_SHOULDERS.DEFINITION.P1,
          IMAGES.CHART_PATTERN.BEARISH.HEAD_AND_SHOULDERS.DEFINITION.P2,
        ],
        text: t.raw("definition.text"),
      }}
      example={{
        stock: t("example.stock"),
        chart: [IMAGES.CHART_PATTERN.BEARISH.HEAD_AND_SHOULDERS.EXAMPLE],
        explanation: t.raw("example.explanation"),
      }}
    />
  );
}
