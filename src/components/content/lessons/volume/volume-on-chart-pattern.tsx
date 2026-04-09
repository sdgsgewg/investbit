"use client";

import { useTranslations } from "next-intl";
import TechAnalysisLessonContent from "../TechAnalysisLessonContent";
import { IMAGES } from "@/app/constants/images";
import ListSection from "../../sections/ListSection";
import ExampleSection from "../../sections/ExampleSection";
import { ExampleData } from "@/app/types/learn/ExampleData";
import { ListData, PointData } from "@/app/types/learn/ListData";
import { mapExampleWithCharts } from "@/lib/mappers/example.mapper";
import ContentParagraph from "../../ContentParagraph";

export default function VolumeOnChartPattern() {
  const t = useTranslations(
    "LearnPage.technicalAnalysis.chapter2.lessons.volume_on_chart_pattern.content",
  );

  const getExampleData = (): ExampleData => {
    const rawExample = t.raw("example");
    const charts = [[IMAGES.VOLUME.VOLUME_ON_CHART_PATTERN.EXAMPLE]];
    return mapExampleWithCharts(rawExample, charts);
  };

  const getListData = () => {
    const list = t.raw("list");
    const listText: string = list.text;
    const listPoints: PointData[] = list.points;

    const getListPoints = () => {
      return listPoints.map((item) => {
        return {
          text: item.text,
        };
      });
    };

    const modifiedList: ListData = {
      text: listText,
      points: getListPoints(),
    };

    return modifiedList;
  };

  return (
    <TechAnalysisLessonContent>
      {/* Intro */}
      <ContentParagraph text={t("p1")} />

      {/* Example Section */}
      <ExampleSection example={getExampleData()} />

      <ContentParagraph text={t("p2")} />
      <ContentParagraph text={t("p3")} />

      <ListSection list={getListData()} />
    </TechAnalysisLessonContent>
  );
}
