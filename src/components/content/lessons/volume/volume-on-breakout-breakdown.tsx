import { useTranslations } from "next-intl";
import TechAnalysisLessonContent from "../TechAnalysisLessonContent";
import ListSection from "../../sections/ListSection";
import { IMAGES } from "@/constants/images";
import ParagraphSection from "../../sections/ParagraphSection";
import { ListData, PointData } from "@/types/learn/ListData";

export default function VolumeOnBreakoutBreakdown() {
  const t = useTranslations(
    "learn.technicalAnalysis.chapter2.lessons.volume_on_breakout_breakdown.content",
  );

  const paragraphs: string[] = t.raw("paragraphs");

  const getListData = () => {
    const points: PointData[] = t.raw("list.points");

    const getListPoints = () => {
      return points.map((item, index) => {
        return {
          text: item.text,
          image:
            IMAGES.VOLUME.VOLUME_ON_BREAKOUT_BREAKDOWN.EXAMPLE[
              `P${index + 1}` as keyof typeof IMAGES.VOLUME.VOLUME_ON_BREAKOUT_BREAKDOWN.EXAMPLE
            ],
        };
      });
    };

    const modifiedList: ListData = { points: getListPoints() };

    return modifiedList;
  };

  return (
    <TechAnalysisLessonContent>
      <ParagraphSection paragraphs={paragraphs} />
      <ListSection list={getListData()} />
    </TechAnalysisLessonContent>
  );
}
