import { useTranslations } from "next-intl";
import TechAnalysisLessonContent from "../TechAnalysisLessonContent";
import ListSection from "../../sections/ListSection";
import { IMAGES } from "@/app/constants/images";
import ParagraphSection from "../../sections/ParagraphSection";

export default function VolumeOnBreakoutBreakdown() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter2.lessons.volume_on_breakout_breakdown.content",
  );

  const paragraphs: string[] = t.raw("paragraphs");

  const points: string[] = t.raw("list.points");

  const getListPoints = () => {
    return points.map((item, index) => {
      return {
        text: item,
        image:
          IMAGES.VOLUME.VOLUME_ON_BREAKOUT_BREAKDOWN.EXAMPLE[
            `P${index + 1}` as keyof typeof IMAGES.VOLUME.VOLUME_ON_BREAKOUT_BREAKDOWN.EXAMPLE
          ],
      };
    });
  };

  return (
    <TechAnalysisLessonContent>
      <ParagraphSection paragraphs={paragraphs} />
      <ListSection points={getListPoints()} />
    </TechAnalysisLessonContent>
  );
}
