import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";

export default function BearishPennant() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bearish.topics.bearish_pennant.content",
  );

  return (
    <TechAnalysisTopicContent
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
