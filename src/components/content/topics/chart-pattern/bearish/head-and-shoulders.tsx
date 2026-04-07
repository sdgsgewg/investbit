import { IMAGES } from "@/app/constants/images";
import TechAnalysisContent from "@/components/content/TechAnalysisTopicContent";
import { useTranslations } from "next-intl";

export default function HeadAndShoulders() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bearish.topics.head_and_shoulders.content",
  );

  return (
    <TechAnalysisContent
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
