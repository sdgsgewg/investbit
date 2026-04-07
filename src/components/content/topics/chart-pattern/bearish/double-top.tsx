import { IMAGES } from "@/app/constants/images";
import TechAnalysisContent from "@/components/content/TechAnalysisTopicContent";
import { useTranslations } from "next-intl";

export default function DoubleTop() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bearish.topics.double_top.content",
  );

  return (
    <TechAnalysisContent
      definition={{
        sideBySideImage: [
          IMAGES.CHART_PATTERN.BEARISH.DOUBLE_TOP.DEFINITION.P1,
          IMAGES.CHART_PATTERN.BEARISH.DOUBLE_TOP.DEFINITION.P2,
        ],
        text: t.raw("definition.text"),
      }}
      example={{
        stock: t("example.stock"),
        chart: [IMAGES.CHART_PATTERN.BEARISH.DOUBLE_TOP.EXAMPLE],
        explanation: t.raw("example.explanation"),
      }}
    />
  );
}
