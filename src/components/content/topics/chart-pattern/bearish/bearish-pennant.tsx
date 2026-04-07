import { IMAGES } from "@/app/constants/images";
import TechAnalysisContent from "@/components/content/TechAnalysisTopicContent";
import { useTranslations } from "next-intl";

export default function BearishPennant() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bearish.topics.bearish_pennant.content",
  );

  return (
    <TechAnalysisContent
      definition={{
        image: [IMAGES.CHART_PATTERN.BEARISH.BEARISH_PENNANT.DEFINITION],
        text: t.raw("definition.text"),
      }}
      example={{
        stock: t("example.stock"),
        chart: [IMAGES.CHART_PATTERN.BEARISH.BEARISH_PENNANT.EXAMPLE],
        explanation: t.raw("example.explanation"),
      }}
    />
  );
}
