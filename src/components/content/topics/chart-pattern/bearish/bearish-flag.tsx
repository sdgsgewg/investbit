import { IMAGES } from "@/app/constants/images";
import TechAnalysisContent from "@/components/content/TechAnalysisTopicContent";
import { useTranslations } from "next-intl";

export default function BearishFlag() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bearish.topics.bearish_flag.content",
  );

  return (
    <TechAnalysisContent
      definition={{
        image: [IMAGES.CHART_PATTERN.BEARISH.BEARISH_FLAG.DEFINITION],
        text: t.raw("definition.text"),
      }}
      example={{
        stock: t("example.stock"),
        chart: [IMAGES.CHART_PATTERN.BEARISH.BEARISH_FLAG.EXAMPLE],
        explanation: t.raw("example.explanation"),
      }}
    />
  );
}
