import { IMAGES } from "@/app/constants/images";
import { useTranslations } from "next-intl";
import TechAnalysisTopicContent from "../../TechAnalysisTopicContent";

export default function InvertedCupAndHandle() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter1.lessons.bearish.topics.inverted_cup_and_handle.content",
  );

  return (
    <TechAnalysisTopicContent
      definition={{
        sideBySideImage: [
          IMAGES.CHART_PATTERN.BEARISH.INVERTED_CUP_AND_HANDLE.DEFINITION.P1,
          IMAGES.CHART_PATTERN.BEARISH.INVERTED_CUP_AND_HANDLE.DEFINITION.P2,
        ],
        text: t.raw("definition.text"),
      }}
      example={{
        stock: t("example.stock"),
        chart: [IMAGES.CHART_PATTERN.BEARISH.INVERTED_CUP_AND_HANDLE.EXAMPLE],
        explanation: t.raw("example.explanation"),
      }}
    />
  );
}
