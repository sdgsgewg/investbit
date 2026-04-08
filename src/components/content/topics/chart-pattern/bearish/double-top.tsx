import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";

export default function DoubleTop() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bearish.topics.double_top.content",
  );

  return (
    <TechAnalysisTopicContent
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
